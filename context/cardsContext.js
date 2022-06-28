import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const CardsContext = createContext();

export const CardsProvider = ({ children, currentPage, currentLimit }) => {
  const [cards, setCards] = useState(null);
  const [page, setPage] = useState(() => +currentPage || 1);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(() => +currentLimit || 10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCards = async (firstLoad = false) => {
    try {
      setLoading(true);
      const newCards = await api.getCards(page, limit);
      setCards(newCards);
    } catch (e) {
      if (!firstLoad) {
        try {
          await api.refresh();
          const newCards = await api.getCards(page, limit);
          setCards(newCards);
        } catch (e) {
          setError(e.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCardsCount = async (firstLoad = false) => {
    try {
      const countCards = await api.getCardsCount();
      setCount(countCards);
    } catch (e) {
      if (!firstLoad) {
        try {
          await api.refresh();
          const countCards = await api.getCardsCount();
          setCount(countCards);
        } catch (e) {
          setError(e.message);
        }
      }
    }
  };

  useEffect(() => {
    Promise.all([fetchCards(true), fetchCardsCount(true)]);
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        count,
        limit,
        error,
        loading,
        fetchCards,
        fetchCards,
        fetchCardsCount,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  return useContext(CardsContext);
};

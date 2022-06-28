import { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const CardsContext = createContext();

export const CardsProvider = ({ children, currentPage, currentLimit }) => {
  const [cards, setCards] = useState(null);
  const [page, setPage] = useState(() => +currentPage || 1);
  const [count, setCount] = useState(null);
  const [limit, setLimit] = useState(() => +currentLimit || 9);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCards = async (page, limit, firstLoad = false) => {
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
      } else {
        throw new Error(e);
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
      } else {
        throw new Error(e);
      }
    }
  };

  const changePage = (page) => {
    const newPage =
      page <= 0
        ? 1
        : page >= Math.trunc(count / limit)
        ? Math.trunc(count / limit)
        : page;
    setPage(newPage);
    fetchCards(newPage, limit);
  };

  useEffect(() => {
    Promise.all([fetchCards(page, limit, true), fetchCardsCount(true)]).catch(() => {
      api.refresh().then(() => {
        Promise.all([fetchCards(page, limit, true), fetchCardsCount(true)]);
      });
    });
  }, []);

  return (
    <CardsContext.Provider
      value={{
        cards,
        count,
        limit,
        error,
        page,
        loading,
        fetchCards,
        fetchCards,
        fetchCardsCount,
        changePage,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  return useContext(CardsContext);
};

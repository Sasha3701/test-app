import { useCards } from "../../context/cardsContext";
import { useWindowSize } from "../../hooks";
import { Button, ButtonGroup } from "@blueprintjs/core";
import styles from "./pagination.module.scss";
import { getArrPage } from "../../utils";
import { useMemo } from "react";

export const Pagination = () => {
  const bp = useWindowSize();
  const { count, page, limit, changePage } = useCards();

  const lastPage = useMemo(() => {
    return Math.trunc(count / limit);
  }, [limit, count]);

  const pages = useMemo(() => {
    return getArrPage(count, limit, page, ["sm", "xs"].includes(bp) ? 5 : 20);
  }, [bp, count, limit, page]);

  return (
    <div className={styles.pagination}>
      <p className={styles.pagination__count}>Найдено: {count}</p>
      {["sm", "xs"].includes(bp) ? (
        <>
          <ButtonGroup minimal fill>
            <Button
              active={page === 1}
              onClick={() => changePage(1)}
              text="Первая"
            />
            <Button
              icon="double-chevron-left"
              onClick={() => changePage(page - 10)}
              disabled={page === 1}
            />
            <Button
              icon="chevron-left"
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
            />
            <Button
              onClick={() => changePage(page + 1)}
              icon="chevron-right"
              disabled={page === lastPage}
            />
            <Button
              onClick={() => changePage(page + 10)}
              icon="double-chevron-right"
              disabled={page === lastPage}
            />
            <Button
              onClick={() => changePage(lastPage)}
              active={page === lastPage}
              text="Последняя"
            />
          </ButtonGroup>
          <ButtonGroup style={{ marginTop: 10 }} minimal fill>
            {pages.map((value) => (
              <Button
                onClick={() => changePage(value)}
                key={value}
                active={page === value}
                text={value}
              />
            ))}
          </ButtonGroup>
        </>
      ) : (
        <ButtonGroup minimal fill>
          <Button
            active={page === 1}
            onClick={() => changePage(1)}
            text="Первая"
          />
          <Button
            icon="double-chevron-left"
            onClick={() => changePage(page - 10)}
            disabled={page === 1}
          />
          <Button
            icon="chevron-left"
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          />
          {pages.map((value) => (
            <Button
              onClick={() => changePage(value)}
              key={value}
              active={page === value}
              text={value}
            />
          ))}
          <Button
            onClick={() => changePage(page + 1)}
            icon="chevron-right"
            disabled={page === lastPage}
          />
          <Button
            onClick={() => changePage(page + 10)}
            icon="double-chevron-right"
            disabled={page === lastPage}
          />
          <Button
            onClick={() => changePage(lastPage)}
            active={page === lastPage}
            text="Последняя"
          />
        </ButtonGroup>
      )}
    </div>
  );
};

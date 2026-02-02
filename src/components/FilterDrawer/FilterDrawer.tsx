import { useEffect, useRef } from "react";
import styles from "./FilterDrawer.module.scss";
import iconCalendar from "../../assets/calender.svg";
import iconArrowDown from "../../assets/arrow down.svg";

export type FilterState = {
  organization: string;
  username: string;
  email: string;
  date: string;
  phone: string;
  status: string;
};

export function FilterDrawer({
  open,
  value,
  onChange,
  onReset,
  onApply,
  onClose,
}: {
  open: boolean;
  value: FilterState;
  onChange: (next: FilterState) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!open) return;
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={styles.wrap}>
      <div className={styles.panel}>
        <div className={styles.field}>
          <label>Organization</label>
          <div className={styles.selectWrap}>
            <select
              value={value.organization}
              onChange={(e) => onChange({ ...value, organization: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
              <option value="Lendstar">Lendstar</option>
            </select>
            <img src={iconArrowDown} alt="" className={styles.selectArrow} aria-hidden />
          </div>
        </div>

        <div className={styles.field}>
          <label>Username</label>
          <input
            placeholder="User"
            value={value.username}
            onChange={(e) => onChange({ ...value, username: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input
            placeholder="Email"
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <div className={styles.dateWrap}>
            <input
              type="date"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              className={styles.dateInput}
            />
            <img src={iconCalendar} alt="" className={styles.dateIcon} aria-hidden />
          </div>
        </div>

        <div className={styles.field}>
          <label>Phone Number</label>
          <input
            placeholder="Phone Number"
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <div className={styles.selectWrap}>
            <select
              value={value.status}
              onChange={(e) => onChange({ ...value, status: e.target.value })}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
            <img src={iconArrowDown} alt="" className={styles.selectArrow} aria-hidden />
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.reset} type="button" onClick={onReset}>
            Reset
          </button>
          <button className={styles.apply} type="button" onClick={onApply}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}

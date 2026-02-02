import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import avatarImg from '../../assets/avartar.png';
import logoImg from '../../assets/Group (4).svg';
import searchIconImg from '../../assets/search icon.svg';
import bellIconImg from '../../assets/bell icon.png';
import dropdownImg from '../../assets/np_dropdown.png';

interface HeaderProps {
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

export function Header({ onMenuClick, isMenuOpen }: HeaderProps) {
  return (
    <header className={styles.header}>
      {onMenuClick && (
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      )}
      <div className={styles.logo}>
        <Link to="/users" className={styles.logoLink} aria-label="Lendsqr home">
          <img src={logoImg} alt="Lendsqr" className={styles.logoIcon} />
        </Link>
      </div>
      <div className={styles.searchWrap}>
        <div className={styles.searchBar}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search for anything"
            aria-label="Search"
          />
          <button type="button" className={styles.searchBtn} aria-label="Search">
            <img src={searchIconImg} alt="" width={14} height={14} aria-hidden />
          </button>
        </div>
      </div>
      <div className={styles.actions}>
        <a href="/docs" className={styles.docsLink}>
          Docs
        </a>
          <img src={bellIconImg} alt="" className={styles.bellIcon} width={26} height={26} aria-hidden />
         
        <div className={styles.userMenu}>
          <img src={avatarImg} alt="" className={styles.avatar} width={48} height={48} />
          <span className={styles.userName}>Adedeji</span>
          <img src={dropdownImg} alt="" className={styles.chevron} width={14} height={14} aria-hidden />
        </div>
      </div>
    </header>
  );
}

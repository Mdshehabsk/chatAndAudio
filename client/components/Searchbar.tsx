import style from '../styles/searchBar.module.css'

const Searchbar = () => {
  return (
    <div className={style.search_bar}>
    <div className={style.search_bar_container} > 
    <input type="text" placeholder="Search People" name="search" autoComplete="off" />
    <div className={style.icon} >
    <i className='bx bx-search-alt-2'></i>
    </div>
     </div>
</div>
  )
}

export default Searchbar
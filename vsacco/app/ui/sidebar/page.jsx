import styles from './sidebar.module.css'
import Link from 'next/link'

const Sidebar = () => {
  const sideBarItems = [
    {
      title: "Dashboard",
      list: [
        {
          name: "Dashboard",
          path: "/admin"
        },
        {
          name: "CBO",
          path: "/admin/cbo"
        },
        {
          name: "Sacco",
          path: "/admin/sacco"
        },
        {
          name: "Accounts",
          path: "/admin/accounts"
        },
        {
          name: "Finances",
          path: "/admin/finances"
        },
      ]
    }
  ]
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <div className={styles.brand_name}>
          <Link href='/'>MQ</Link>
        </div>
        <p className={styles.brand_slogan}>Your One Stop Sacco</p>
      </div>

      <ul className={styles.sideBarMenu}>
        {sideBarItems.map((category) => (
          <li key={category.title}>
            <span>{category.title}</span>
            <ul className={styles.sideBarList}>
              {category.list.map((listItem) =>(
                <li key={listItem.name}>
                  {listItem.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
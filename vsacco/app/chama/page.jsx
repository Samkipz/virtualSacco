import styles from './chamaPage.module.css'
import prisma from '../lib/prisma';
import Link from 'next/link';

const  ChamaList = async () => {
  const chamaList = await prisma.chama.findMany({
    where:{
      deleted: 0,
    }
  });

  // console.log(chamaList)

  return (
    <div className={styles.container}>
      <div>Our Chamas</div>
      <ul className={styles.chamaList}>
        {chamaList.map((chama)=>(
          <Link 
            key={chama.id} 
            href={`/chama/${encodeURIComponent(chama.id)}`}
            className={styles.chama}
          >
            <li>
              <span className={styles.chamaNameDesc}>
                <span className={styles.chamaName}>{chama.name}</span>
                <span className={styles.chamaDesc}>{chama.description}</span>
              </span>
              <span className={styles.viewMore}>View More</span>
            </li>
          </Link>
          
        ))}
      </ul>
    </div>
  )
}

export default ChamaList
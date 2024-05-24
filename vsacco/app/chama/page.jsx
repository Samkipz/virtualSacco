import styles from './chama.module.css'
import prisma from '../lib/prisma';

const  ChamaList = async () => {
  const chamaList = await prisma.chama.findMany({
    where:{
      deleted: 0,
    }
  });

  console.log(chamaList)

  return (
    <div className={styles.container}>
      <ul>
        {chamaList.map((chama)=>(
          <li key={chama.id}>{chama.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default ChamaList
"use client"
import useReceiptDownload from '@/hooks'

import Image from 'next/image'

import styles from './page.module.css'

export default function Home() {
  const { onDownload } = useReceiptDownload()
  return (
    <main className={styles.main}>
      <button onClick={()=> onDownload()}>Download</button>
    </main>
  )
}

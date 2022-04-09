import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ChangeEventHandler, FormEvent, useState } from 'react'
import { IOptions } from '../types/types'
import useFilter from '../lib/useFilter'
import Post from '../components/Post'

const Home: NextPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [radioBtn, setRadioBtn] = useState<IOptions['sort']>('ASC');
  const [active, setActive] = useState(false);
  const [filtredPosts, filter] = useFilter(posts);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      sort: radioBtn,
      filter: {
        name,
        value: description
      }
    };
    setActive(!active);
    filter(options);
  }

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setDescription(e.currentTarget.value);
  }
  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value)
  }

  const handleRadioASC: ChangeEventHandler<HTMLInputElement> = () => {
    setRadioBtn('ASC')
  }
  const handleRadioDESC: ChangeEventHandler<HTMLInputElement> = () => {
    setRadioBtn('DESC')
  }

  const handleActiveBtn = () => {
    setActive(!active)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={handleActiveBtn}>Фильтр</button>

      {filtredPosts.map((post) => <Post post={post} key={post.id} /> ) }

      <form onSubmit={handleSubmit} className={`${styles.filter} ${active && styles.active}`} >
        <label className={styles.textInput}>
          Name
          <input type='text' name='name' onChange={handleChangeName} value={name}/>
        </label>
        <label className={styles.textInput}>
          Value
          <input type='text' name='value' onChange={handleChangeValue} value={description}/>
        </label>
        <label className={styles.radioBtn}>
          По возрастанию
          <input type='radio' checked={radioBtn === 'ASC'} onChange={handleRadioASC} />
        </label>
        <label className={styles.radioBtn}>
          По убыванию
          <input type='radio' checked={radioBtn === 'DESC'} onChange={handleRadioDESC} />
        </label>
        <input type='submit' value='Отфильтровать' />
        <button type='button' onClick={handleActiveBtn} >Закрыть</button>
      </form>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //const data = await fetch('http://localhost:3000/api/posts');
  //const posts = await data.json();
  const posts = require('./_posts/posts.json');
  return {
    props: {
      posts
    }
  }
}

export default Home

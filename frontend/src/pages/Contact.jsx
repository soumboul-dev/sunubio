import React from 'react'
import Title from '../components/Title'
import assets from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"NOUS"} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.images.contct} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Sunu Bio & Co</p>
          <p className='text-gray-500'>À la Gueule Tapée, rue 67, Dakar</p>
          <p className='text-gray-500'>
            Tel : (221) 78-720-39-75<br />
            Email : contact@sunubio.com
          </p>
          <p className='font-semibold text-xl text-gray-600'>Rejoignez l’équipe Sunu Bio & Co</p>
          <p className='text-gray-500'>Découvrez nos opportunités et rejoignez une équipe engagée pour le bien-être et le bio.</p>
          <button className='border border-green-700 px-8 py-4 text-sm hover:bg-green-700 hover:text-white transition-all duration-500'>
            Voir les offres
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
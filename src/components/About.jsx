import React from 'react';
import { connect } from 'react-redux';

const About = (props) => {

  const lang = props.menus.lang
  const text = {
    en: {
      q1: 'What is qr-menu.rest?',
      a1: 'QR-menu.rest is a platform for uploading documents and getting a QR code for them. It was designed for bars and restaurants to host their menus but it sure is not limited to it and everyone is welcome on this platform.',
      q2: 'How much does it cost?',
      a2: 'Use of qr-menu.rest is absolutely free! No strings attached.',
      q3: 'What are the benefits of QR menu over paper?',
      a31: '1. Easy to update and change menus.',
      a32: '2. Save on printing cost.',
      a33: '3. Contactless and touchless experience.',
      q4: 'Something is not working or I need assistance what should I do?',
      a4: 'Please feel free to reach out with any feedback or requests from the contact page.',
      q5: 'TEAM',
      a5: 'Alex Okarkau, creation and implementation of the idea. San Francisco based full-stack software engineer with over 10 years of experience in the hospitality industry. Has developed architecture and infrastructure of the application, along with UI.',
    },
    ru: {
      q1: 'Что такое qr-menu.rest?',
      a1: 'QR-menu.rest это платформа для загрузки файлов (.pdf и .jpeg) которая генерирует QR код для загруженного файла. На сайте есть несколько вариаций загрузок: 1-1 генерирует код для каждого файла отдельно, а так же есть возможность сгенерировать 1 код или обновлять документы которые к нему привязаны (только .pdf формат), что будет идельным вариантом для баров и ресторанов. Особенно для меню которые можно будет обновлять даже во время сервиса.',
      q2: 'Сколько это стоит?',
      a2: 'Пользование платформой абсолютно бесплатно.',
      q3: 'Какие преимущества пользования QR вместо бумажных меню?',
      a31: '1. Легко делать обновления и поправки которые вступают в силу моментально.',
      a32: '2. Экономия денег на чернилах и бумаге.',
      a33: '3. Гость быстро и легко может получить доступ к меню.',
      q4: 'Если что-то не работает или у меня есть какие-либо технические вопросы, что мне делать?',
      a4: 'Пожалуйста для связи используйте имейл форму в Контактах по любым вопросам.',
      q5: 'КОМАНДА',
      a5: 'Александр Окорков - создание приложения и имплемитация идеи. Програмист из Сан Франциско с более чем десятилетним стажем в отрасли гостепреимства (рестораны, бары, отели). Разработал архитектуру, инфраструктуру и дизайн приложения.',
    }
  }


  const sectionStyle = {
    width: "100%",
    height: "100px",
    backgroundImage: "url(/qr_bg.png)",
    backgroundPosition: "center",
  };

  return (
    <div style={{textAlign: 'center', justifyContent: 'center'}}>

      <section style={ sectionStyle }>
      </section>

      <h3 className='text-title'>
      {text[lang].q1}
      </h3>
      <p className='text'>
      {text[lang].a1}
      </p>

      <h3 className='text-title'>
      {text[lang].q2}
      </h3>
      <p className='text'>
      {text[lang].a2}
      </p>

      <h3 className='text-title'>
      {text[lang].q3}
      </h3>
      <p className='text'>
      {text[lang].a31}
      </p>
      <p className='text'>
      {text[lang].a32}
      </p>
      <p className='text'>
      {text[lang].a33}
      </p>

      <h3 className='text-title'>
      {text[lang].q4}
      </h3>
      <p className='text'>
        {text[lang].a4}
      </p>

      <h3 className='text-title'>
      {text[lang].q5}
      </h3>
      <div style={{display: 'flex', direction: 'column', justifyContent: 'center', flexWrap: 'wrap'}}>
        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHK654wKyMfQQ/profile-displayphoto-shrink_800_800/0/1618464639450?e=1650499200&v=beta&t=adQTBBXKr60cHOtn47dX4ZjmzfcemmgCr1GoL5T_jYY" alt="image" style={{zoom: '0.3', border: '7px solid black'}}/>
        <p className='text home-description' style={{paddingTop: '3%'}}>
          {text[lang].a5}
        </p>
        </div>

    </div>
  );
}

const mapStateToProps = function(state) {
  return state
}

export default connect(mapStateToProps)(About);

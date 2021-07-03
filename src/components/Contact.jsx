import React from 'react';

  const Contact = (props) => {

  let email = 'me@aokarkau.com';

  const [subject, setSubject] = React.useState({subject: ''});
  const [body, setBody] = React.useState({body: ''});
  let link = `mailto:${email}?subject=${subject.subject}&body=${body.body}`;

  const handleSubjectInput = (e) => {
    setSubject({
      [e.target.name]: e.target.value
    })
    link = `mailto:${email}?subject=${subject.subject}&body=${body.body}`;
  }

  const handleBodyInput = (e) => {
    setBody({
      [e.target.name]: e.target.value
    })
    link = `mailto:${email}?subject=${subject.subject}&body=${body.body}`;
  }

    return (
      <div id="contact">
          <label className="text">Send an email!</label>
          <input className="input" type="email" maxlength="50" placeholder="Title..." name="subject"  value={subject.subject} onChange={(e) => handleSubjectInput(e)}/>
          <textarea className="input" rows="8" maxlength="500" placeholder="Contents..." name="body"  value={body.body} onChange={(e) => handleBodyInput(e)}/>
          <a href={link} target="_blank" rel="noopener noreferrer"><button className="button btn">Send</button></a>
        </div>
      );
  }

  export default Contact;



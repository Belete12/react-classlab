import React from 'react';
import Header from '../shared/Header';
import styles from '../App.module.css';

const About = () => {
  return (
    <section>
      <h1>About This App</h1>
      <p>
        This Todo List app is designed to help you stay organized, focused, and
        productive.
      </p>
      <p>
        Built with React and powered by Airtable, it features dynamic sorting,
        real-time search.
      </p>
      <p>Created by Belete.</p>
    </section>
  );
};

export default About;

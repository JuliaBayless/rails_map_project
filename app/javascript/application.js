// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import React from 'react';
import ReactDOM from 'react-dom';
import WelcomeComponent from '../components/WelcomeComponent'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <WelcomeComponent />,
    document.body.appendChild(document.createElement('div')),
  )
});

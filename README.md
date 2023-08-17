# README
Rails Map Project
This is a brief description of what your Rails app does.

Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Ruby (version as per .ruby-version or Gemfile)
Rails (version as per Gemfile)
PostgreSQL or [whichever database you're using]
Node.js
Yarn (if you're using Webpacker for assets)
Git

Setup & Installation
Clone the repository:

```bash
git clone https://github.com/JuliaBayless/rails_map_project.git
cd rails_map_project
```
Install dependencies:

Install the required Ruby gems:

```bash
bundle install
```

Install JavaScript packages (if you're using Webpacker):

```bash
yarn install
```

Setup the database:

This will create the database, run migrations.

```bash
rails db:setup
```
If you prefer to run these steps separately:

```bash
rails db:create
rails db:migrate
```

Environment Variables:
In the root of your Rails application, create a file named .env. This file will hold all of your environment variables:

```plaintext
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
Create your credentials here: https://console.cloud.google.com/
Replace your_google_maps_api_key, your_google_client_id, and your_google_client_secret with your actual credentials.

Start the Rails server:

```bash
rails s
```

By default, the server will run on http://localhost:3000/. Visit this in your browser to see your application.

Running Rspec Tests
```bash
bundle exec rspec
bundle exec rspec spec/path/to/rspec/file
```

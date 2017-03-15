'use strict';

var articles = [];

function Article (opts) {
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* TODO: Now use jQuery to fill in the rest of the current
  template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */
  // $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('time').text(this.publishedOn);
  $newArticle.find('.article-body').html(this.body);
  // Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
  // console.table(articles);
});

articles.forEach(function(a) {
  $('#articles').append(a.toHtml());
});

const metalsmith = require('metalsmith');
const drafts = require('metalsmith-drafts');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const layouts = require('metalsmith-layouts');
const sitemap = require('metalsmith-sitemap');
const Handlebars = require('handlebars');
const moment = require('moment');

Handlebars.registerHelper('is', function (value, test, options) {
    if (value === test) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

Handlebars.registerHelper('date', function (date) {
    return moment(date, "MM-DD-YYYY").format('Do MMM \'YY');
});

metalsmith(__dirname)
    .source('src/main/metalsmith')
    .destination('./dist')
    .clean(true)
    .use(drafts())
    .use(collections({
        posts: {
            pattern: 'posts/*.md',
            sortBy: 'date',
            reverse: true
        },
        pages: {
            pattern: '*.md',
            sortBy: 'menu-order'
        }
    }))
    .use(markdown())
    .use(permalinks())
    .use(layouts({
        engine: 'handlebars',
        directory: 'src/main/resources/layouts',
        default: 'default.hbs',
        partials: 'src/main/resources/layouts/partials'
    }))
    .use(sitemap({
        hostname: "https://two-tier.netlify.com"
    }))
    .build(function (err) {
        if (err) throw err;
    });

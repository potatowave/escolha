exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('alternatives').insert({id: 1, case_id:1, name: 'Facebook',    image_url: 'https://www.facebook.com/images/fb_icon_325x325.png', order: 1, is_hidden: false}),
    knex('alternatives').insert({id: 2, case_id:1, name: 'Google',      image_url: 'https://www.google.ca/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png', order: 2, is_hidden: false}),

    knex('alternatives').insert({id: 3, case_id:1, name: 'LightHouse',  image_url: 'http://www.lighthouselabs.ca/static-assets/lighthouse-labs.png', order: 3, is_hidden: false}),

    knex('alternatives').insert({id: 4, case_id:2, name: 'Ferrari',  image_url: 'https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg', order: 1, is_hidden: false}),

    knex('alternatives').insert({id: 5, case_id:2, name: 'Maserati',  image_url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X', order: 2, is_hidden: false}),

    knex('alternatives').insert({id: 6, case_id:2, name: 'Lamborghini',  image_url: 'https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg', order: 3,is_hidden: false})
  ]);
};
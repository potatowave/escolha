// store state
// {
//   users: [
//     {id: 1, name: "Bob"}
//   ],
//   cases: [
//     {id: 1, title: "Car Purchase"}
//   ],
//   alternatives: [
//     {id: 1, title: "Toyota Corolla", case_id: 1, order: 1}
//     {id: 2, title: "Honda Civic", case_id: 1, order: 2}
//   ],
//   objectives: [
//     {id: 1, title: "Cost - Purchase Price", unit: "$", case_id: 1, order: 1}
//     {id: 2, title: "Cost - Upkeep", unit: "$", case_id: 1, order: 2}
//   ],
//   cells: [
//     {id: 1, value: 12000, objective_id: 1, alternative_id: 1},
//     {id: 2, value: 12000, objective_id: 1, alternative_id: 2},
//     {id: 3, value: 12000, objective_id: 2, alternative_id: 1},
//     {id: 4, value: 12000, objective_id: 2, alternative_id: 2},
//   ],
//   uiState: {
//     currentCaseId: 1,
//     currentAlternativeId: 2,
//   }
// }


test_data = { 
  users: [
    {id: 1, name: "Bob"},
  ],
  
  cases: [{
    name: "Car",
    description: "I want to choose some car" }],

  objectives:
   [ { id_frontend: 99,
       name: 'Cost',
       sub_name: 'Price',
       evaluation_objective: 'Just the car price',
       low_is_better: true,
       unit_name: '          money',
       unit_prefix: '$',
       unit_suffix: '',
       scale_type: 'this is managed on the front-end' },

     { id_frontend: 88,
       name: 'Cost',
       sub_name: 'Mainetence',
       evaluation_objective: 'Per year mainetence',
       low_is_better: true,
       unit_name: 'money',
       unit_prefix: '$',
       unit_suffix: '',
       scale_type: 'this is managed on the front-end' } ],

  alternatives:
   [ { id_frontend: 11,
       name: 'Ferrari',
       image_url: 'https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg' },
     { id_frontend: 22,
       name: 'Lamborghini',
       image_url: 'https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg' },
     { id_frontend: 33,
       name: 'Lamborghini',
       image_url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X' } ],

  values:
   [ { objective_id_frontend: 99,
       alternative_id_frontend: 11,
       value: 150000 },
     { objective_id_frontend: 99,
       alternative_id_frontend: 22,
       value: 390888 },
     { objective_id_frontend: 99,
       alternative_id_frontend: 33,
       value: 420123 },
     { objective_id_frontend: 88,
       alternative_id_frontend: 11,
       value: 120 },
     { objective_id_frontend: 88,
       alternative_id_frontend: 22,
       value: 99 },
     { objective_id_frontend: 88,
       alternative_id_frontend: 33,
       value: 560 } ] 

  uiState: {
    currentCaseId: 1,
    currentAlternativeId: 2,
  } 
}

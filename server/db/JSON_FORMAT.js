// JSON format: Front-end to Backend
// ----------------------------------------------------------------------------
// New Case
// ----------------------------------------------------------------------------

data = {
  case: {
    "name": "Car",
    "description": "I want to choose some car"
  },

  "objectives": [{
      "id_frontend":          99,
      "name":                 "Cost",
      "sub_name":             "Price",
      "evaluation_objective": "Just the car price",
      "low_is_better":        true,
      "unit_name": "          money",
      "unit_prefix":          "$",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    },

    {
      "id_frontend":          88,
      "name":                 "Cost",
      "sub_name":             "Mainetence",
      "evaluation_objective": "Per year mainetence",
      "low_is_better":        true,
      "unit_name":            "money",
      "unit_prefix":          "$",
      "unit_suffix":          "",
      "scale_type":           "this is managed on the front-end"
    }
  ],

  "alternatives": [{
      "id_frontend": 11,
      "name":       "Ferrari",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg"
    },

    {
      "id_frontend": 22,
      "name":       "Lamborghini",
      "image_url":  "https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg"
    },

    {
      "id_frontend": 33,
      "name":       "Lamborghini",
      "image_url":  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X"
    }
  ],

  "values": [{
      "objective_id_frontend": 99,
      "alternative_id_frontend": 11,
      "value": 150000
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 22,
      "value": 390888
    }, {
      "objective_id_frontend": 99,
      "alternative_id_frontend": 33,
      "value": 420123
    },

    {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 11,
      "value": 120
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 22,
      "value": 99
    }, {
      "objective_id_frontend": 88,
      "alternative_id_frontend": 33,
      "value": 560
    }
  ]
}

// ----------------------------------------------------------------------------
// Update entire Case!!
// ----------------------------------------------------------------------------

data = {

  "case": {
    "name": "Cars Updated!",
    "description": "new description just updated"
  },

  "objectives": [{
      "id":                   107,
      "name":                 "Update-Cost",
      "sub_name":             "Price",
      "evaluation_objective": "Just the car price",
      "low_is_better":        true,
      "order":                2,
      "unit_name":            "money",
      "unit_prefix":          "$",
      "unit_suffix":          ""
    },

    {
      "id":                   108,
      "name":                 "Update-Cost",
      "sub_name":             "Update-Mainetence",
      "evaluation_objective": "Update-Per year mainetence",
      "low_is_better":        true,
      "order":                1,
      "unit_name":            "money",
      "unit_prefix":          "$",
      "unit_suffix":          ""
    }
  ],

  "alternatives": [{
      "id":           157,
      "name":         "Ferrari!!",
      "image_url":    "updated-https://s-media-cache-ak0.pinimg.com/236x/89/5c/b1/895cb18bd918640844fdd3bc6297fddd.jpg"
    },

    {
      "id":           158,
      "name":         "Lamborghini!!",
      "image_url":    "updated-https://s-media-cache-ak0.pinimg.com/236x/c8/71/07/c871079f871b72609735e584235f1f12.jpg"
    },

    {
      "id":           159,
      "name":         "Maserati!!",
      "image_url":    "updated-https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSyqYUmFsqlT5RtmrxJNGhq70lk2ePKuffpBILv1UtIfk71nE5X"
    }
  ],

  "values": [{
      "alternative_id":   157,
      "objective_id":     107,
      "value":            999999
    }, {
      "alternative_id":   158,
      "objective_id":     107,
      "value":            888888
    }, {

      "alternative_id":   159,
      "objective_id":     107,
      "value":            777777
    },

    {
      "alternative_id":   11,
      "objective_id":     108,
      "value":            877
    }, {
      "alternative_id":   22,
      "objective_id":     108,

      "value":            650
    }, {
      "alternative_id":   33,
      "objective_id":     108,
      "value":            999
    }
  ]
}
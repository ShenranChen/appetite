import mongoose from 'mongoose'
const { Schema, model } = mongoose

const CatalogSchema = new Schema({
    'mon': 
    {
        'breakfast': 
        {
           'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ],
            'epicuria': [ {type: String} ]
        }
    },
    'tue':
     {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ],
            'epicuria': [ {type: String} ]
        }
    },
    'wed': 
    {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
        'bplate': [ {type: String} ],
        'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ],
            'epicuria': [ {type: String} ]
        }
    },
    'thu': 
    {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ],
            'epicuria': [ {type: String} ]
        }
    },
    'fri': 
    {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        }
    },
    'sat': 
    {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        }
    },
    'sun': 
    {
        'breakfast': 
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'lunch':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ]
        },
        'dinner':
        {
            'bplate': [ {type: String} ],
            'deneve': [ {type: String} ],
            'epicuria': [ {type: String} ]
        }
    }
})

const Catalog = model('Catalog', CatalogSchema, 'catalog')
export default Catalog;
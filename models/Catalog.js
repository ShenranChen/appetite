import mongoose from 'mongoose'
const { Schema, model } = mongoose

const CatalogSchema = new Schema({
    "mon": 
    {
        "breakfast": 
        {
           "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": [],
            "epicuria": []
        }
    },
    "tue":
     {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": [],
            "epicuria": []
        }
    },
    "wed": 
    {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
        "bplate": [],
        "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": [],
            "epicuria": []
        }
    },
    "thu": 
    {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": [],
            "epicuria": []
        }
    },
    "fri": 
    {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": []
        }
    },
    "sat": 
    {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": []
        }
    },
    "sun": 
    {
        "breakfast": 
        {
            "bplate": [],
            "deneve": []
        },
        "lunch":
        {
            "bplate": [],
            "deneve": []
        },
        "dinner":
        {
            "bplate": [],
            "deneve": [],
            "epicuria": []
        }
    }
})

const Catalog = model('Catalog', CatalogSchema)
export default Catalog;
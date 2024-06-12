import { Schema, model, models } from "mongoose";

const ToolSchema = Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        default: "",
    },

    image: {
        type: String,
        default: "",
    },
    tags: [
        {
            type: String,
        },
    ],
    posted_by: {
        type: String,
        default: "",
    },
    posted_by_email: {
        type: String,
        default: "",
    },

    status: {
        type:Boolean,
        default: false,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true,
    },
    dataCreated: {
        type: Date,
        default: Date.now,
    },
});


ToolSchema.virtual('id').get(function () {
    return this._id.toHexString()
});


ToolSchema.set('toJSON', {
    virtuals: true
})

const aitools = models.aitools || model('aitools', ToolSchema);

export default aitools;


export async function expandObjectByFunctionKey(functionKey) {

    const pipeline = [
      {
        $lookup: {
          from: 'functions',
          localField: 'functionKey',
          foreignField: '_id',
          as: 'function'
        }
      },
      {
        $unwind: '$function'
      }
    ];
  
    const result = await aitools.aggregate(pipeline).exec();
    return result;
  }
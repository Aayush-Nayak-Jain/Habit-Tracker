import mongoose from "mongoose";

const CATEGORIES= ["Health", "Productivity", "Learning", 
    "Fitness", "Mindfulness", "Finance", "Social", "Creative", "Other"];

const habitSchema = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", required: true, index:true
        },
        name: {
            type: String,required: true, trim: true,
        },
        description: {
            type: String, default: "", trim: true,
        },
        frequency: {
            type: String, enum: ["Daily", "Weekly"], default: "Daily",
        },
        targetDays:{
            type: Number, default: 1, min: 1,max:7
        },
        color:{
            type:String, default:"#6366f1"
        },
        icon:{
            type:String, default:"🎯"
        },
        isArchived:{
            type: Boolean, default: false,
        },
        order:{
            type: Number, default: 0,
        }
    },
    {timestamps: true  }
);

export const HABIT_CATEGORIES = CATEGORIES;
export default mongoose.model("Habit", habitSchema);
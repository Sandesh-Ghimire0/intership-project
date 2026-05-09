import mongoose from "mongoose";
import { User } from "../routes/v1/user/user.model.js";

const mockUsers = [
    {
        username: "sandesh_ghimire",
        email: "sandesh@exp.com",
        password: "sandesh",
        role: "fullstack_developer",
        description:
            "Versatile full stack developer proficient in the MERN stack and passionate about building community-driven platforms for local businesses.",
    },
    {
        username: "aarav_sharma",
        email: "aarav@exp.com",
        password: "sandesh",
        role: "backend_developer",
        description:
            "Senior backend engineer with deep expertise in Node.js, microservices, and managing large-scale MongoDB databases for fintech apps.",
    },
    {
        username: "prakriti_adhikari",
        email: "prakriti@exp.com",
        password: "sandesh",
        role: "frontend_developer",
        description:
            "Expert frontend developer specialized in creating high-performance React applications with a focus on Nepali localized interfaces.",
    },
    {
        username: "binita_karki",
        email: "binita@exp.com",
        password: "sandesh",
        role: "ui_ux_designer",
        description:
            "Creative designer focused on crafting intuitive user experiences and modern visual identities that resonate with a global audience.",
    },
    {
        username: "roshan_poudel",
        email: "roshan@exp.com",
        password: "sandesh",
        role: "devops_engineer",
        description:
            "DevOps specialist focused on cloud automation, CI/CD pipelines, and ensuring the reliability of high-traffic software systems.",
    },
    {
        username: "anup_thapa",
        email: "anup@exp.com",
        password: "sandesh",
        role: "qa_engineer",
        description:
            "Dedicated QA engineer with a strong background in automated testing and finding critical bugs before they reach the production stage.",
    },
    {
        username: "sneha_shrestha",
        email: "sneha@exp.com",
        password: "sandesh",
        role: "data_scientist",
        description:
            "Data enthusiast specialized in machine learning and statistical analysis to help organizations make data-driven decisions.",
    },
    {
        username: "manish_basnet",
        email: "manish@exp.com",
        password: "sandesh",
        role: "project_manager",
        description:
            "Strategic project manager experienced in Agile methodologies and leading cross-functional teams to deliver projects on time.",
    },
    {
        username: "ayush_maharjan",
        email: "ayush@exp.com",
        password: "sandesh",
        role: "mobile_developer",
        description:
            "Mobile application developer with a passion for building smooth, high-performance Android and iOS apps using Flutter.",
    },
    {
        username: "deepak_neupane",
        email: "deepak@exp.com",
        password: "sandesh",
        role: "cloud_architect",
        description:
            "Certified cloud architect designing secure and scalable infrastructure solutions on AWS for enterprise-level applications.",
    },
    {
        username: "sushant_ghimire",
        email: "sushant@exp.com",
        password: "sandesh",
        role: "frontend_developer",
        description:
            "Frontend enthusiast who loves working with Next.js and Tailwind CSS to build modern, SEO-friendly web applications.",
    },
    {
        username: "kriti_joshi",
        email: "kriti@exp.com",
        password: "sandesh",
        role: "backend_developer",
        description:
            "Focused backend developer specialized in API design, authentication systems, and server-side performance optimization.",
    },
    {
        username: "nischal_lamichhane",
        email: "nischal@exp.com",
        password: "sandesh",
        role: "fullstack_developer",
        description:
            "Problem solver who enjoys building complete web solutions from database schema design to the final polished frontend.",
    },
    {
        username: "priyanka_rai",
        email: "priyanka@exp.com",
        password: "sandesh",
        role: "ui_ux_designer",
        description:
            "User experience designer dedicated to creating accessible and inclusive digital products through user research and testing.",
    },
    {
        username: "bibek_gurung",
        email: "bibek@exp.com",
        password: "sandesh",
        role: "devops_engineer",
        description:
            "Infrastructure engineer with expertise in containerization using Docker and orchestration with Kubernetes.",
    },
    {
        username: "anita_magar",
        email: "anita@exp.com",
        password: "sandesh",
        role: "qa_engineer",
        description:
            "Detail-oriented software tester focused on manual and automated end-to-end testing for complex web ecosystems.",
    },
    {
        username: "rajesh_hamal",
        email: "rajesh@exp.com",
        password: "sandesh",
        role: "data_scientist",
        description:
            "Experienced data analyst using Python and SQL to uncover trends and patterns in large-scale commercial datasets.",
    },
    {
        username: "sujan_shrestha",
        email: "sujan@exp.com",
        password: "sandesh",
        role: "project_manager",
        description:
            "Effective communicator and manager focused on streamlining workflows and improving team collaboration in tech startups.",
    },
    {
        username: "dipesh_pun",
        email: "dipesh@exp.com",
        password: "sandesh",
        role: "mobile_developer",
        description:
            "Native mobile developer specialized in Swift and SwiftUI for building elegant, user-friendly Apple ecosystem apps.",
    },
    {
        username: "sarita_bista",
        email: "sarita@exp.com",
        password: "sandesh",
        role: "cloud_architect",
        description:
            "Cloud strategist focused on serverless computing and migrating legacy systems to modern cloud infrastructures.",
    },
];

// 3. Execution Function
async function seedDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/taskmanager");
        console.log("Connected to MongoDB successfully...");

        // await User.deleteMany({});
        // console.log("Collection cleared.");

        await User.create(mockUsers);
        console.log("Successfully seeded users!");

        process.exit();
    } catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
}

seedDB();

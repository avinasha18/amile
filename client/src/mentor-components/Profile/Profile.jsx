import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import { FaInstagram, FaLinkedin, FaPaperclip } from "react-icons/fa";
import { setUserData } from "../../services/redux/AuthSlice";
import { useTheme } from "../../context/ThemeContext";
import { Actions } from "../../hooks/actions";
import { useDispatch, useSelector } from "react-redux";

const MentorProfile = () => {
    const { isDarkMode } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [activeTab, setActiveTab] = useState("Qualifications");
    const dispatch = useDispatch();

    const tabs = ["Qualifications", "Experience", "Certifications"];
    const [user, setUser] = useState({});
    const userData = useSelector((state) => state.auth.userData);
    const [newItem, setNewItem] = useState({});
    let titles = user.title;

    if (titles) {
        titles = titles.split(",");
    }

    useEffect(() => {
        getUser();
    }, []);

    const hasQualifications =
        user?.qualifications && user?.qualifications.length > 0;
    const hasExperience = user?.workExperience && user?.workExperience.length > 0;
    const hasCertifications = user?.certifications && user?.certifications.length > 0;

    const [isAdding, setIsAdding] = useState(false);

    // Set initial state with a safe check
    const [activeDegree, setActiveDegree] = useState(user?.qualifications?.[0]?.name);
    const firstCertificateName = user?.certifications?.[0]?.name;
    const [activeCertification, setActiveCertification] = useState(
        firstCertificateName
    );

    const renderQualificationContent = () => {
        if (!activeDegree) {
            return <div>Select a qualification to view details.</div>;
        }

        const degree = user.qualifications.find((q) => q.name === activeDegree);

        if (!degree) {
            return <div>Degree not found.</div>;
        }
        return (
            <div className="flex flex-shrink-0 justify-between items-center px-32 py-5">
                <div className="w-1/2">
                    <p className="text-lg font-semibold">
                        Institute: {degree.institution}
                    </p>
                    <p className="text-md">Year : {degree.year}</p>
                    <p className="text-sm">{degree.description}</p>
                </div>
                <div className="rounded-lg overflow-hidden">
                    <img src={degree.collegeLogo} alt={degree.institution} />
                </div>
            </div>
        );
    };

    const renderCertificationContent = () => {

        if (!activeCertification) {
            return <div>Select a qualification to view details.</div>;
        }

        const certification = user.certifications.find(
            (cert) => cert.name === activeCertification
        );
        return (
            <div className="flex flex-shrink-0 justify-between items-center px-32 py-5">
                {hasCertifications ? (
                    <>
                        <div>
                            <h2 className="text-2xl font-bold">{certification?.name}</h2>
                            <p className="text-lg font-semibold">{certification?.issuedBy}</p>
                            <p className="text-md">Date of Issue: {certification?.issueDate}</p>
                            <p className="text-md">
                                Expiry Date: {certification?.expiryDate || "N/A"}
                            </p>
                            <p className="text-sm">{certification?.description}</p>
                        </div>
                        <div className="rounded-lg overflow-hidden w-96">
                            <img
                                src={certification?.organizationLogo}
                                alt={certification?.issuedBy}
                            />
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        );
    };

    const getUser = async () => {
        try {
            const response = await Actions.fetchMentor();

            if (response.data.success) {
                dispatch(setUserData(response.data.data));
                setUser(response.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleSkillEdit = () => {
        setIsEditingSkills(!isEditingSkills);
    };

    const handleAddSkill = async (newSkill) => {
        if (newSkill.trim()) {
            // Update user state
            const updatedSkills = [...user.skills, newSkill.trim()];
            setUser((prevUser) => ({
                ...prevUser,
                skills: updatedSkills,
            }));

            try {
                // Update the user in the database
                const updatedUser = { ...user, skills: updatedSkills };
                const response = await Actions.updateMentor(updatedUser);
                if (response.data.success) {
                    dispatch(setUserData(response.data.data));
                } else {
                    console.log("Failed to add skill");
                }
            } catch (error) {
                console.error("Error adding skill:", error);
            }
        }
    };

    const handleRemoveSkill = async (skillIndex) => {
        // Remove skill from local state
        setUser((prevUser) => {
            const updatedSkills = prevUser.skills.filter((_, index) => index !== skillIndex);
            
            // Update the database with the new skills list
            const updatedUser = { ...prevUser, skills: updatedSkills };
            
            Actions.updateMentor(updatedUser)
                .then((response) => {
                    if (response.data.success) {
                        // Optionally update your local state or notify the user
                        console.log('Skill removed and user updated successfully.');
                    } else {
                        console.log('Failed to update user in the database.');
                    }
                })
                .catch((error) => {
                    console.error('Error updating user in the database:', error);
                });
            
            return updatedUser;
        });
    };
    

    const themeStyles = {
        background: isDarkMode ? "bg-black" : "bg-gray-100",
        text: isDarkMode ? "text-gray-300" : "text-gray-800",
        heading: isDarkMode ? "text-white" : "text-gray-900",
        card: isDarkMode ? "bg-gray-900" : "bg-white",
        cardBorder: isDarkMode ? "border-gray-800" : "border-gray-200",
        input: isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800",
        button: isDarkMode
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-blue-500 hover:bg-blue-600",
        tabActive: isDarkMode ? "bg-blue-600" : "bg-blue-500",
        tabInactive: isDarkMode ? "bg-gray-800" : "bg-gray-200",
        skillTag: isDarkMode
            ? "bg-gray-800 text-gray-300"
            : "bg-gray-200 text-gray-700",
    };

    const updateUserInDatabase = async (updatedUser) => {
        try {
            const response = await Actions.updateMentor(updatedUser);
            if (response.data.success) {
                dispatch(setUserData(response.data.data));
                setUser(response.data.data);
            } else {
                console.log("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleEdit = async (field, value) => {
        const updatedUser = { ...user, [field]: value };
        setUser(updatedUser);
        await updateUserInDatabase(updatedUser);
    };

    const handleAddItem = async (section) => {
        // Update the local state first
        setUser((prevUser) => {
            const updatedItems = Array.isArray(prevUser[section])
                ? [...prevUser[section], newItem]
                : [newItem];
            return {
                ...prevUser,
                [section]: updatedItems,
            };
        });

        // Clear newItem
        setNewItem({});

        try {
            // Update the user in the database
            const updatedUser = { ...user, [section]: [...user[section], newItem] };
            const response = await Actions.updateMentor(updatedUser);

            if (response.data.success) {
                dispatch(setUserData(response.data.data));
            } else {
                console.log("Failed to add item");
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }

        setIsAdding(false);
    };

    const handleRemoveItem = (section, index) => {
        setUser((prevUser) => ({
            ...prevUser,
            [section]: prevUser[section].filter((_, i) => i !== index),
        }));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Experience":
                return (
                    <div className={`w-full flex flex-col px-10`}>
                        <div className="max-w-6xl flex flex-col gap-2">
                            {hasExperience ? (
                                user.workExperience.map((experience, index) => (
                                    <div
                                        key={index}
                                        className="w-full p-6 my-5 rounded-lg backdrop-blur-lg bg-black bg-opacity-50 shadow-lg border-t border-slate-500/30"
                                    >
                                        <h2 className="text-xl font-bold text-white mb-2">
                                            {experience.position}
                                        </h2>
                                        <p className="text-xl tracking-wider text-slate-400 mb-1">
                                            {experience.company}
                                        </p>
                                        <p className="text-lg text-slate-500">
                                            {experience.duration}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="px-16 py-5">
                                    <h3 className="text-xl font-semibold">
                                        I don't have experience yet
                                    </h3>
                                </div>
                            )}
                        </div>

                        {isAdding ? (
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Experience Position"
                                    value={newItem.position || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, position: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    value={newItem.company || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, company: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Duration"
                                    value={newItem.duration || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, duration: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <button
                                    onClick={() => handleAddItem("workExperience")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Add Experience
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1 mt-5 w-1/3"
                            >
                                <FaPlus /> <span>Add Experience</span>
                            </button>
                        )}
                    </div>
                );
            case "Certifications":
                return (
                    <div className="rounded-lg mb-20 w-full px-16">
                        {hasCertifications ? (
                            <>
                                <div className="flex mb-4 ">
                                    <ul className="flex justify-evenly w-full">
                                        {user.certifications?.map((cert) => (
                                            <li
                                                key={cert.name}
                                                onClick={() => setActiveCertification(cert.name)}
                                                className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 border-slate-500/30 border
                                    ${activeCertification === cert.name
                                                        ? "bg-slate-900 text-white"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {cert.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {renderCertificationContent()}
                            </>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold">
                                    Add your Certifications here.
                                </h3>
                            </div>
                        )
                        }
                        {isAdding ? (
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Certification Name"
                                    value={newItem.name || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, name: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Issued By"
                                    value={newItem.issuedBy || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, issuedBy: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newItem.description || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, description: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter certificate link"
                                    value={newItem.organizationLogo || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, organizationLogo: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <button
                                    onClick={() => handleAddItem("certifications")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
                                >
                                    Add Certifications
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1 mt-5"
                            >
                                <FaPlus /> <span>Add Certifications</span>
                            </button>
                        )}
                    </div>
                );
            case "Qualifications":
                return (
                    <div className="rounded-lg mb-20 p-10 w-full">
                        {hasQualifications ? (
                            <>
                                <div className="flex mb-4">
                                    <ul className="flex justify-evenly w-full">
                                        {user.qualifications?.map((tab) => (
                                            <li
                                                key={tab.name}
                                                onClick={() => setActiveDegree(tab.name)}
                                                className={`py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 border-slate-500/30 border
                                                        ${activeDegree ===
                                                        tab.name
                                                        ? "bg-slate-900 text-white"
                                                        : "text-slate-400"
                                                    }`}
                                            >
                                                {tab.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {renderQualificationContent()}
                            </>
                        ) : (
                            <div>No qualifications available.</div>
                        )}
                        {isAdding ? (
                            <div className="mt-5">
                                <input
                                    type="text"
                                    placeholder="Qualification Name"
                                    value={newItem.name || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, name: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Institute Name"
                                    value={newItem.institution || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, institution: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Year"
                                    value={newItem.year || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, year: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newItem.description || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, description: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter Image URL"
                                    value={newItem.collegeLogo || ""}
                                    onChange={(e) =>
                                        setNewItem({ ...newItem, collegeLogo: e.target.value })
                                    }
                                    className="bg-gray-800 text-white px-4 py-2 rounded w-full mb-2"
                                />
                                <button
                                    onClick={() => handleAddItem("qualifications")}
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Add Qualifications
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded flex justify-center items-center gap-1 mt-5"
                            >
                                <FaPlus /> <span>Add Qualification</span>
                            </button>
                        )}
                    </div>
                );
            default:
                return <p>Select a tab to view content.</p>;
        }
    };

    return (
        <div className={`min-h-screen p-8 overflow-auto w-full bg-black`}>
            <div className="max-w-6xl mx-auto flex flex-col gap-1 mb-10">
                <div className="flex flex-shrink-0 gap-10">
                    {/* Profile Section */}
                    <div className="rounded-lg p-6 mb-8 w-3/4 backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full mr-6"
                                />
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={user.name}
                                            onChange={(e) => handleEdit("name", e.target.value)}
                                            className="px-2 py-1 rounded mb-2 bg-slate-700 text-white mr-2"
                                        />
                                    ) : (
                                        <h1 className="text-2xl font-bold">{user.name}</h1>
                                    )}
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={user.title}
                                            onChange={(e) => handleEdit("title", e.target.value)}
                                            className="px-2 py-1 rounded mb-2 bg-slate-700 text-white"
                                        />
                                    ) : (
                                        <div className="flex flex-wrap gap-2 my-5">
                                            {titles?.map((title, index) => (
                                                <p
                                                    key={index}
                                                    className={`text-white px-4 py-2 rounded-md bg-slate-900 border-2 border-gray-600`}
                                                >
                                                    {title.trim()}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-white px-4 py-2 rounded bg-slate-800"
                            >
                                {isEditing ? "Save" : "Edit"}
                            </button>
                        </div>
                    </div>
                    {/* Social Media */}
                    <div className="rounded-lg p-6 mb-8 w-1/4 backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30">
                        <p className="text-xl font-bold mb-4">Social Media</p>
                        <SocialMedia media="github" user={user}/>
                        <SocialMedia media="linkedin" user={user}/>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="rounded-lg w-full mb-16">
                    <div className="flex w-3/4">
                        <ul className="flex">
                            {tabs.map((tab, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => setActiveTab(tab)}
                                        className={`text-white px-10 py-2 rounded-t-md ${activeTab === tab
                                            ? "bg-slate-900 border-b-0"
                                            : "bg-slate-800 bg-opacity-20"
                                            } border border-gray-600`}
                                    >
                                        {tab}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30 py-10">
                        {renderTabContent()}
                    </div>
                </div>

                {/* Skills Sections */}
                <div className="rounded-lg p-6 mb-8 w-3/4 backdrop-blur-lg bg-slate-800 bg-opacity-50 shadow-lg border border-slate-500/30">
                    <h3 className={`text-lg font-semibold ${themeStyles.heading} mb-2`}>
                        Skills
                    </h3>
                    {isEditingSkills ? (
                        <>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {user?.skills?.map((skill, index) => (
                                    <div key={index} className="flex items-center">
                                        <span
                                            className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm mr-2`}
                                        >
                                            {skill}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveSkill(index)}
                                            className="text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Add Skill"
                                className={`${themeStyles.input} px-4 py-2 rounded w-full mb-2`}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleAddSkill(e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </>
                    ) : (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {user?.skills?.map((skill, index) => (
                                <span
                                    key={index}
                                    className={`${themeStyles.skillTag} px-2 py-1 rounded text-sm`}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleSkillEdit}
                        className={`${themeStyles.button} text-white px-4 py-2 rounded mt-2`}
                    >
                        {isEditingSkills ? "Save" : "Edit"}
                    </button>
                </div>
            </div>
        </div>
    );
};


const SocialMedia = ({ media, user }) => {
    const renderSocialMedia = (media) => {
        switch (media) {
            case "github":
                return (
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <FaSquareGithub />
                        {
                            user?.github ? (
                                <Link to="">
                                    <h1>Github</h1>
                                </Link>
                            ) : (
                                <Link to="">
                                    <h1>Connect to Github</h1>
                                </Link>
                            )
                        }
                    </div>
                );
            case "linkedin":
                return (
                    <div className="flex flex-shrink-0 items-center gap-4">
                        <FaLinkedin />
                        {
                            user?.linkedin ? (
                                <Link to="">
                                    <h1>Linkedin</h1>
                                </Link>
                            ) : (
                                <Link to="">
                                    <h1>Connect to Linkedin</h1>
                                </Link>
                            )
                        }
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className="flex flex-shrink-0 gap-6">{renderSocialMedia(media)}</div>
    );
};

export default MentorProfile;

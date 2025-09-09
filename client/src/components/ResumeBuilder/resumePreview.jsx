import React, { useRef } from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { FileIcon, PrinterIcon, SaveIcon } from "lucide-react";
import { PDFDocument, rgb } from 'pdf-lib';
// Utility function to export to PDF
const exportToPDF = (pdfExportComponent) => {
  pdfExportComponent.current.save();
};

const ResumePreview = ({ resume }) => {
  const pdfExportComponent = useRef(null);



  const exportToJSON = () => {
    const json = JSON.stringify(resume, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.json";
    link.click();
  };
  const actions = [
    { icon: <SaveIcon />, name: "Save" },
    { icon: <FileIcon />, name: "Export Json", render: exportToJSON },
    { icon: <PrinterIcon />, name: "Export to Pdf", render: () => exportToPDF(pdfExportComponent) },
  ];

  return (
    <div className="mb-24 bg-white">
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action?.render}
          />
        ))}
      </SpeedDial>

      <PDFExport
        ref={pdfExportComponent}
        paperSize="A4"
        margin={5}
        scale={0.7}
        fileName={`${resume.name}_amile_resume.pdf`}
      >
        <div className="resume-preview p-8 h-fit min-h-screen">
          <header className="text-center mb-1">
            <h1 className="text-4xl font-semibold">{resume.name}</h1>
            <h2 className="text-l font-semibold mt-1">{resume.title}</h2>
            <p className="mt-1">
            <a href={`mailto:${resume.contact.email}`}>  {resume.contact.email}</a> | {resume.contact.phone} |{" "}
              {resume.contact.address}
            </p>
            <p className="mt-1">
              <a
                href={resume.links.codechef}
                className="mr-1 text-blue-600 hover:underline"
              >
                CodeChef
              </a>{" "}
              |{" "}
              <a
                href={resume.links.linkedin}
                className="mr-1 text-blue-600 hover:underline"
              >
                LinkedIn
              </a>{" "}
              |{" "}
              <a
                href={resume.links.leetcode}
                className="mr-1 text-blue-600 hover:underline"
              >
                LeetCode
              </a>{" "}
              |{" "}
              <a
                href={resume.links.github}
                className="mr-1 text-blue-600 hover:underline"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href={resume.links.portfolio}
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            </p>
          </header>

          <section className="mb-3">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Education
            </h3>
            {resume.education.map((edu, index) => (
              <div
                className="mt-1 flex justify-between items-start ml-3"
                key={index}
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold">{edu.institution}</h4>
                  <p className="text-gray-600">{edu.degree}</p>
                  <p className="text-gray-600">CGPA: {edu.cgpa}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-gray-600">{edu.location}</p>
                  <p className="text-gray-600">{edu.period}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Other sections */}
          <section className="mb-3">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Experience
            </h3>
            {resume.experience.map((exp, index) => (
              <div key={index} className="mt-2 ml-2">
                <div className="flex justify-between">
                  <h4 className="text-lg font-sm align-bottom">
                    {exp.organisation} | {exp.title}
                  </h4>
                  <p className="text-gray-600">
                    {exp.location} | {exp.period}
                  </p>
                </div>
                <p className="text-gray-600 mt-0 justify-content ml-8">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>

          <section className="mb-3">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Skills
            </h3>
            <div className="mt-2 space-y-1 ml-4">
              <div className="flex">
                <span className="w-2/5 font-semibold">
                  Programming Languages:
                </span>
                <span>{resume.skills.programmingLanguages}</span>
              </div>
              <div className="flex">
                <span className="w-2/5 font-semibold">Libraries/Frameworks:</span>
                <span>{resume.skills.frameworks}</span>
              </div>
              <div className="flex">
                <span className="w-2/5 font-semibold">Tools/Platforms:</span>
                <span>{resume.skills.tools}</span>
              </div>
              <div className="flex">
                <span className="w-2/5 font-semibold">Databases:</span>
                <span>{resume.skills.databases}</span>
              </div>
            </div>
          </section>

          <section className="mb-3">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Projects / Open-Source
            </h3>
            {resume.projects.map((project, index) => (
              <div key={index} className="mt-1 ml-4">
                <div className="flex justify-between">
                  <h4 className="text-lg font-semibold">
                    {project.title} |{" "}
                    <a
                      href={project.link}
                      className="text-blue-600 hover:underline"
                    >
                      Link
                    </a>
                  </h4>
                  <p className="text-gray-600 mt-1">{project.skills}</p>
                </div>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
            ))}
          </section>

          <section className="mb-3">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Certifications
            </h3>
            <ul className="list-disc list-inside mt-1 ml-4">
              {resume.certifications.map((cert, index) => (
                <li key={index} className="text-gray-600">
                  {cert.title} - {cert.organisation}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-1">
            <h3 className="text-xl font-semibold border-b-2 border-gray-400 pb-1">
              Honors & Awards
            </h3>
            <ul className="list-disc list-inside mt-1 ml-4">
              {resume.honors.map((honor, index) => (
                <li key={index} className="text-gray-600">
                  {honor.title}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </PDFExport>
    </div>
  );
};

export default ResumePreview;

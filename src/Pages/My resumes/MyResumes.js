import React, { useEffect, useState } from "react";
import "../My resumes/MyResumes.css";
import { Button } from "@mui/material";
import BlackScreen from "../../Components/BlackScreen";
import { templates } from "../../Data/templates";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import {
  addAllExperience,
  addEducation,
  addPersonalInfo,
  editSkill,
  selectResume,
  selectTemplate,
} from "../../Redux/actions"; // Ensure all these are correctly defined in your action creators file
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Common/Navbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Map the Redux state to component props
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
});

// Map the Redux dispatch actions to component props
const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
  setSelectedResumeId: (id) => dispatch(selectResume(id)),
  onAddPersonalInfo: (details) => dispatch(addPersonalInfo(details)),
  setAllExperience: (experiences) => dispatch(addAllExperience(experiences)),
  onAddEducation: (details) => dispatch(addEducation(details)),
  onEditSkill: (skills) => dispatch(editSkill(skills)),
});

const MyResumes = (props) => {
  const [resumes, setResumes] = useState([]);

  // Fetch the resume data from localStorage on component mount
  useEffect(() => {
    const newResumes = window.localStorage.getItem("resumes")
      ? JSON.parse(window.localStorage.getItem("resumes"))
      : [];
    setResumes(newResumes);
  }, []);

  const navigate = useNavigate();

  // Get the template associated with a resume
  const getTemplate = (resume, index) => {
    let template = templates.find(
      (eachTemplate) => eachTemplate.id === resume.template_id
    );

    const TemplateComp = React.cloneElement(template.template, {
      personalinfo: resume.personalInfo,
      workexperience: resume.experiences,
      educationinfo: resume.educationInfo,
      skills: resume.skills,
      key: resume.id,
      index: index,
    });

    return TemplateComp;
  };

  // Delete a resume from the list and update localStorage
  const deleteResume = (resume) => {
    let resumes = window.localStorage.getItem("resumes");
    let newResumes = JSON.parse(resumes);
    const newSetOfResumes = newResumes.filter(
      (eachResume) => eachResume.id !== resume.id
    );
    window.localStorage.setItem("resumes", JSON.stringify(newSetOfResumes));
    setResumes(newSetOfResumes);
  };

  // Set Redux state with selected resume's data
  const setUserData = (resume) => {
    props.onAddPersonalInfo(resume.personalInfo);
    props.setAllExperience(resume.experiences);
    props.onAddEducation(resume.educationInfo);
    props.onEditSkill(resume.skills);
  };

  // Navigate to the detail filling page for a selected resume
  const navigateToFillDetails = (resume) => {
    props.setSelectedTemplateId(resume.template_id);
    props.setSelectedResumeId(resume.id);
    setUserData(resume);
    navigate("/template/fill-details");
  };

  return (
    <>
      <Navbar active={"My Resumes"} />
      <div className="my-resumes">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" alignItems="center" className="grid">
            {resumes.length >= 1 ? (
              resumes.map((resume, index) => (
                <Grid item className={`resume`} id={`${index}resume`} margin={2} key={index}>
                  <Item id={`${index}ITEM`}>
                    {getTemplate(resume, index)}
                    <BlackScreen />
                    <div className="use-template-btn-cont">
                      <Button className="use-template-btn" size="medium" variant="contained">
                        Download
                      </Button>
                      <Button
                        className="use-template-btn"
                        onClick={() => {
                          deleteResume(resume);
                        }}
                        size="medium"
                        variant="contained">
                        Delete
                      </Button>
                      <Button
                        className="use-template-btn"
                        onClick={() => navigateToFillDetails(resume)}
                        size="medium"
                        variant="contained">
                        Edit Template
                      </Button>
                    </div>
                  </Item>
                </Grid>
              ))
            ) : (
              <div className="no-resumes-container">
                <SentimentVeryDissatisfiedIcon fontSize="large" />
                <p className="no-resumes-text">Make at least one Resume</p>
              </div>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

// Connect component to Redux store
export default connect(mapStateToProps, mapDispatchToProps)(MyResumes);

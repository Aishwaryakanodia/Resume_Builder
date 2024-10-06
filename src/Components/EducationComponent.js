import { Divider, MenuItem, Paper, Select } from "@mui/material";
import React, { useState } from "react";
import "../Styles/EducationComponent.css";
import BackNextBtnComponent from "./BackNextBtnComponent";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import { connect } from "react-redux";
import {
  addEducation,
  addExperience, // Ensure this is imported
  addAllExperience, // Ensure this is imported
} from "../Redux/actions";
import { useForm, Controller } from "react-hook-form";

const years = ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];

// Main Redux state and dispatch mapping (single instance)
const mapStateToProps = (state) => ({
  educationInfo: state.educationDetailsReducer.educationInfo,
  experiences: state.workExperienceReducer.experiences,
});

const mapDispatchToProps = (dispatch) => ({
  onAddEducation: (details) => dispatch(addEducation(details)),
  setExperience: (experience) => dispatch(addExperience(experience)),
  setAllExperience: (experiences) => dispatch(addAllExperience(experiences)),
});

const EducationComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // Handler functions for back and next
  const handleBack = () => props.setTab(props.tab - 1);
  
  const handleNext = (data) => {
    setLoading(true);
    props.onAddEducation(data);
    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1000);
  };

  return (
    <Paper className="education-paper" elevation={3}>
      <h2 className="education-heading">Education Details</h2>
      <Divider sx={{ margin: "10px 0px" }} />
      <form onSubmit={handleSubmit(handleNext)}>
        <div className="education-form-cont">
          {/* Input fields for domain, university, and degree */}
          <InputComponent
            title={"Domain"}
            type={"text"}
            name={"domain"}
            register={register}
            multiline={false}
            value={props.educationInfo.domain}
            setValue={(value) => props.onAddEducation({ ...props.educationInfo, domain: value })}
            error={!!errors.domain}
            errorMessage={errors.domain?.message}
          />
          <InputComponent
            title={"University"}
            type={"text"}
            name={"university"}
            register={register}
            multiline={false}
            value={props.educationInfo.university}
            setValue={(value) => props.onAddEducation({ ...props.educationInfo, university: value })}
            error={!!errors.university}
            errorMessage={errors.university?.message}
          />
          <InputComponent
            title={"Degree"}
            type={"text"}
            name={"degree"}
            register={register}
            multiline={false}
            value={props.educationInfo.degree}
            setValue={(value) => props.onAddEducation({ ...props.educationInfo, degree: value })}
            error={!!errors.degree}
            errorMessage={errors.degree?.message}
          />

          {/* Select fields for start year and end year */}
          <SelectComponent title={"Start Year"} errorMessage={errors.startYear?.message} error={!!errors.startYear}>
            <Controller
              render={({ field }) => (
                <Select value={field.value} onChange={field.onChange} error={!!errors.startYear}>
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name={"startYear"}
              control={control}
              rules={{ required: "*Please select start year" }}
              defaultValue={props.educationInfo.startYear}
            />
          </SelectComponent>
          <SelectComponent title={"End Year"} errorMessage={errors.endYear?.message} error={!!errors.endYear}>
            <Controller
              render={({ field }) => (
                <Select value={field.value} onChange={field.onChange} error={!!errors.endYear}>
                  {years.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name={"endYear"}
              control={control}
              rules={{ required: "*Please select end year" }}
              defaultValue={props.educationInfo.endYear}
            />
          </SelectComponent>
        </div>
        <Divider sx={{ margin: "10px 0px" }} />
        {/* Back and Next buttons */}
        <BackNextBtnComponent onNext={handleNext} onBack={handleBack} loading={loading} tab={props.tab} nextTitle={"Next"} backTitle={"Back"} />
      </form>
    </Paper>
  );
};

// Connecting to Redux with mapStateToProps and mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(EducationComponent);

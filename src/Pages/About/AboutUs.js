import { Stack, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/system";
import Navbar from "../../Components/Common/Navbar";
import aboutimg from "../../Images/Aboutus-img2.jpg";
export default function ButtonMUI() {
  return (
    <>
      <Navbar />
      <Stack p={{ xs: "15px", sm: "25px", md: "40px", lg: "60px " }}>
        <h2 className="template-header-title">Resume </h2>
        <h2 className="template-header-title"> <u style={{textDecorationColor:"red"}}>Builder</u></h2>
        <Stack
          className="midContainer"
          direction={{
            xs: "column-reverse",
            sm: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          mt="20px"
        >
          <Typography
            sx={{
              fontSize: {
                xs: "13px",
                sm: "15px",
                md: "17px",
                lg: "19px",
              },
              paddingRight: {
                xs: "15px",
                sm: "18px",
                lg: "25px",
              },
              textAlign: "justify",
            }}
          >
            <p>The Resume Builder project is designed to provide users with an intuitive platform to create professional resumes effortlessly. Whether you are a student, a fresh graduate, or an experienced professional, this application helps you craft resumes tailored to your career goals. With its user-friendly interface, users can select from a variety of templates, fill in their personal details, work experience, education, and skills, and generate a polished resume in minutes.</p>

<p>The application offers a seamless experience by allowing users to edit, preview, and download their resumes. The interactive templates are designed to highlight the key strengths and achievements of the individual, making their profile stand out to potential employers. Additionally, the Resume Builder is equipped with features that let users save and manage multiple resumes, catering to different job profiles and applications.</p>

<p>Built with modern web technologies like React, Redux, and Material UI, the platform ensures a responsive and visually appealing user experience. Our mission is to simplify the resume-building process, enabling users to focus more on their job search and career growth. Whether you need a basic layout or a more creative format, Resume Builder has something for everyone!</p>
          </Typography>
          <Stack>
            <img src={aboutimg} alt="img" style={{ width: 600, height: 400 }} />
          </Stack>
        </Stack>
        <Box mt="25px">
          <Typography
            sx={{
              fontSize: {
                xs: "22px",
                sm: "25px",
                md: "27px",
                lg: "30px",
              },
              fontWeight: "400",
              color: "dark",
            }}
          >
            Share with your friends
          </Typography>
          <Box className="icons">
            <LinkedInIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="primary"
            />
            <FacebookOutlinedIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="primary"
            />
            <WhatsAppIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="success"
            />
            <TwitterIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="info"
            />
            <EmailIcon
              sx={{ fontSize: "40px", paddingLeft: "15px" }}
              color="error"
            />
          </Box>
        </Box>
      </Stack>
    </>
  );
}

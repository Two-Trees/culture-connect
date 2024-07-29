import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
    marginTop: theme.spacing(4),
    maxWidth: '330px',
}));

const Header = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(1),
    fontSize: "2rem", // Increased font size
}));

const Paragraph = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    // maxWidth: '600px',
    fontSize: "1rem"
}))

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        schoolCommunity: "",
        additionalInfo: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const response = await fetch('http://localhost:5001/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Failed to submit request.');
            }
        } catch (error) {
            console.error('Error submitting request: ', error);
            alert('Failed to submit request.');
        }
    };

    if (submitted) {
        return (
            <StyledContainer>
                <Typography variant="h4" align="center" gutterBottom>
                    Thank you for your request!
                </Typography>
                <Typography variant="body1" align="center">
                    We have received your request and will get back to you shortly.
                </Typography>
            </StyledContainer>
        );
    }

    return (
        <StyledContainer>
            <Header variant="h2">Connect With Us</Header>
            <Paragraph> Interested in connecting with an artist? The next step is to fill out this simple form and we will follow up with you! </Paragraph>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="School or Community"
                            name="schoolCommunity"
                            value={formData.schoolCommunity}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Anything else you would like us to know?"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" type="submit">
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </StyledContainer>
    );
};

export default Form;



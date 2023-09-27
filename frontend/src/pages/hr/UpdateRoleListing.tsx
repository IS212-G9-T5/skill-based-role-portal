import {useState} from 'react'
import {
    Container,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Grid,
  } from '@mui/material';
import NavBar from '../../components/Navbar';
  
  interface Skill {
    name: string;
  }
  
  const skillsData: Skill[] = [
    { name: 'Skill 1' },
    { name: 'Skill 2' },
    { name: 'Skill 3' },
    { name: 'Skill 4' },
    // Add more skills as needed
  ];
  
  const initialFormData = {
    jobTitle: '',
    jobDescription: '',
    openingDate: '',
    closingDate: '',
    selectedSkills: [] as Skill[],
  };

const UpdateRoleListing = () => {
    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSkillChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedSkills = event.target.value as Skill[];
        setFormData({ ...formData, selectedSkills });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission here
        console.log(formData);
    };

    const title = "SKILLS BASED ROLE PORTAL"
    const items = ["View Listings", "View Profile", "Logout"]

    return (
        <div>
        <NavBar title={title} items={items} />
        <Container className='pl-[10%] pr-[10%] pt-[2%]'>
            <Typography variant="h2" gutterBottom>
                <b>
                    <span className="mr-2 bg-[#1976D2] pl-2"></span>
                    Update Job Listing
                </b>
            </Typography>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="jobTitle"
                        label="Job Title"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="jobDescription"
                        label="Job Description"
                        multiline
                        rows={4}
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        name="openingDate"
                        value={formData.openingDate}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        name="closingDate"
                        value={formData.closingDate}
                        onChange={handleInputChange}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="skills-label">Skills Required</InputLabel>
                    <Select
                    labelId="skills-label"
                    multiple
                    name="selectedSkills"
                    value={formData.selectedSkills}
                    onChange={handleSkillChange}
                    renderValue={(selected) => (
                        <div>
                        {(selected as Skill[]).map((skill) => (
                            <Chip key={skill.name} label={skill.name} />
                        ))}
                        </div>
                    )}
                    required
                    >
                    {skillsData.map((skill) => (
                        <MenuItem key={skill.name} value={skill}>
                            {skill.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                    Update
                </Button>
                </Grid>
            </Grid>
            </form>
        </Container>
        </div>
        
    );
}

export default UpdateRoleListing
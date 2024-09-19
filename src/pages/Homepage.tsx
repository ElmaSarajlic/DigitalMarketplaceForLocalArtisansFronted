import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardList from '../components/CardList'; 

const HomePage: React.FC = () => {
  

  return (
    
    <div>
      <Typography variant="h4" component="h2" gutterBottom sx={{
        fontFamily: '"Cookie", cursive', 
        fontSize: '50px',
        color: 'white',
        outline: 'inherit',
        textShadow: `
          -1px -1px 0 #543884,  
          1px -1px 0 #543884,
          -1px 1px 0 #543884,
          1px 1px 0 #543884;`,
        margin: (theme) => theme.spacing(4, 3),
        paddingTop: (theme) => theme.spacing(5),
      }}>
        Something Unique for Everybody...
      </Typography>
      <Container style={{ marginTop: '100px' }}>
      <CardList/>
      </Container>
    </div>
  );
};

export default HomePage;

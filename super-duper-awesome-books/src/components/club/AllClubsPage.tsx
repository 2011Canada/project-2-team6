import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ErrorText from '../ErrorText';
import NavigationBar from '../navigation/NavigationBar';
import { Club } from '../Model/Club';
import { ClubsList } from './ClubsList';
import wood from '../../pictures/wood.jpg'

export const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 300,
    },
});

export const AllClubsPage = () => {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchClubs = async () => {
            setError(false);
            try {
                const result = await axios.get(`http://localhost:8080/clubs`);
                setClubs(result.data);
            } catch (error) {
                setError(true);
                toast.error("Something Went Wrong!")
            }
        };
        fetchClubs();
    }, []);

    return (

        <>

            <NavigationBar />
            <div style={{ backgroundImage: `url(${wood})`, backgroundSize: 'cover', height: '100vh', paddingTop: '1%' }}>
                {error && (
                    <ErrorText>Some error occurred, while fetching books API</ErrorText>
                )}
                {/* <Container> */}
                <div style={{ marginTop: '2em', marginLeft: '38%' }}>
                    {clubs && <ClubsList clubs={clubs} />}
                </div>
                {/* </Container> */}
            </div>

        </>
    );
};


export default AllClubsPage;
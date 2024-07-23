import React from "react";
import { Card } from "react-bootstrap";

const StudentCard = ({ student }) => {
  const {
    image,
    firstName,
    middleName,
    lastName,
    birthYear,
    team,
    subTeam,
    instrument,
  } = student;
  const age = new Date().getFullYear() - birthYear;

  const getDriveImageUrl = (driveLink) => {
    if (driveLink === "") return "";
    const fileId = driveLink.match(/id=([a-zA-Z0-9_-]+)/)[1];
    return `https://drive.google.com/thumbnail?id=${fileId}`;
  };

  return (
    <Card className="mb-4 shadow-sm cursor-pointer">
      <Card.Img
        variant="top"
        src={getDriveImageUrl(image)}
        alt={firstName}
        height={"400px"}
      />
      <Card.Body className="text-center">
        <Card.Title>
          {firstName} {middleName} {lastName}
        </Card.Title>
        <Card.Text>Age: {age}</Card.Text>
        <Card.Text>
          Team: {team} - {subTeam}
        </Card.Text>
        <Card.Text>Instrument: {instrument}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default StudentCard;

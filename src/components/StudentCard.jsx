import React from "react";
import { Card } from "react-bootstrap";

export const getDriveImageUrl = (driveLink) => {
  if (!driveLink || typeof driveLink !== "string") return "";
  const match = driveLink.match(/id=([a-zA-Z0-9_-]+)/);
  return match ? `https://drive.google.com/thumbnail?id=${match[1]}` : driveLink;
};

const StudentCard = ({ student = {} }) => {
  const {
    image = "",
    firstName = "",
    middleName = "",
    lastName = "",
    birthYear,
    team = "",
    subTeam = "",
    instrument = "",
  } = student;
  
  const age = birthYear ? new Date().getFullYear() - Number(birthYear) : 0;

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

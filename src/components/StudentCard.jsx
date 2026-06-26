import React from "react";
import { Card } from "react-bootstrap";
import { extractDriveId } from "../utils/match";

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
    const fileId = extractDriveId(driveLink);
    return fileId ? `https://drive.google.com/thumbnail?id=${fileId}` : "";
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

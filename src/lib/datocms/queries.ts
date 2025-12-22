import { gql } from "graphql-request";

export const GET_ALL_GLUCOSE_RECORDS = gql`
  query GetAllGlucoseRecords {
    allGlucoseRecords(orderBy: date_DESC) {
      id
      date
      mealType
      glucoseLevel
      _createdAt
    }
  }
`;

export const CREATE_GLUCOSE_RECORD = gql`
  mutation CreateGlucoseRecord(
    $date: DateTime!
    $mealType: String!
    $glucoseLevel: IntType!
  ) {
    createGlucoseRecord(
      data: { date: $date, mealType: $mealType, glucoseLevel: $glucoseLevel }
    ) {
      id
      date
      mealType
      glucoseLevel
    }
  }
`;

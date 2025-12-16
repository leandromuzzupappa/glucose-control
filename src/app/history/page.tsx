export default function Home() {
  return (
    <div>
      <h1>My History</h1>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Comida</th>
            <th>Glucosa</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-06-01</td>
            <td>Desayuno</td>
            <td>110 mg/dL</td>
          </tr>
          <tr>
            <td>2024-06-01</td>
            <td>Almuerzo</td>
            <td>130 mg/dL</td>
          </tr>
          <tr>
            <td>2024-06-01</td>
            <td>Cena</td>
            <td>120 mg/dL</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

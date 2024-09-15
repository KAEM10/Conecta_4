import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap
import './App.css';

function App() {
  // Inicializar una matriz de 7x6 con ceros
  const initialMatrix = Array(6).fill().map(() => Array(7).fill(0));

  // Usar useState para manejar la matriz en el estado
  const [matrix, setMatrix] = useState(initialMatrix);
  const [val, setValue] = useState(1);
  const [redWins, setRedWins] = useState(0);
  const [yellowWins, setYellowWins] = useState(0);

  useEffect(() => {
    const initialMatrix = Array(6).fill().map(() => Array(7).fill(0));
    const clearMatrix = () => {
      setMatrix(initialMatrix);
    }
    const checkWinner = () => {
      // check horizontal
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
          if (matrix[i][j] === matrix[i][j + 1] && matrix[i][j] === matrix[i][j + 2] && matrix[i][j] === matrix[i][j + 3] && matrix[i][j] !== 0) {
            return matrix[i][j];
          }
        }
      }

      // check vertical
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
          if (matrix[i][j] === matrix[i + 1][j] && matrix[i][j] === matrix[i + 2][j] && matrix[i][j] === matrix[i + 3][j] && matrix[i][j] !== 0) {
            return matrix[i][j];
          }
        }
      }

      // check diagonal
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
          if (matrix[i][j] === matrix[i + 1][j + 1] && matrix[i][j] === matrix[i + 2][j + 2] && matrix[i][j] === matrix[i + 3][j + 3] && matrix[i][j] !== 0) {
            return matrix[i][j];
          }
        }
      }

      // check diagonal
      for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
          if (matrix[i][j] === matrix[i + 1][j - 1] && matrix[i][j] === matrix[i + 2][j - 2] && matrix[i][j] === matrix[i + 3][j - 3] && matrix[i][j] !== 0) {
            return matrix[i][j];
          }
        }
      }

      return null;
    }
    const winner = checkWinner();
    if (winner) {
      if (winner === 1) {
        setRedWins((prevRedWins) => {
          const updatedRedWins = prevRedWins + 1;
          return updatedRedWins;
        });
      } else {
        setYellowWins((prevYellowWins) => {
          const updatedYellowWins = prevYellowWins + 1;
          return updatedYellowWins;
        });
      }
      alert(`El jugador ${winner === 1 ? '🔴' : '🟡'} ha ganado!`);
      clearMatrix();
      setValue(1);
    }
  }, [matrix]);

  // Función para actualizar un valor en la matriz
  const updateMatrixValue = (row, col, value) => {
    // tocar la columna y pintar la ultima celda vacia
    let newMatrix = matrix.map((row) => [...row]);
    for (let i = 5; i >= 0; i--) {
      if (newMatrix[i][col] === 0) {
        newMatrix[i][col] = value;
        break;
      }
    }
    setMatrix(newMatrix);
    setValue(val === 1 ? 2 : 1);
  };

  const clearMatrix = () => {
    setMatrix(initialMatrix);
  }

  const resetCounter = () => {
    setRedWins(0);
    setYellowWins(0);
  }

  return (
    <div className="container p-4 text-center">
      <h1>Conecta 4</h1>
      <div className="table-container d-inline-block p-4">
        <table className="table table-bordered">
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex} className='table-row'>
                {row.map((value, colIndex) => (
                  <td className='table-cell'
                    key={colIndex}
                    onClick={() => updateMatrixValue(rowIndex, colIndex, val)}
                  >
                    {value === 0 ? '⚪' : value === 1 ? '🔴' : '🟡'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        <i>🟡 = {yellowWins}</i>
        <i className='m-4'>🔴 = {redWins}</i>
      </div>
      <button className='btn btn-secondary m-2' onClick={clearMatrix}>Reiniciar Partida</button>
      <button className='btn btn-secondary m-2' onClick={resetCounter}>Resetar Contador</button>
    </div>

  );
}

export default App;

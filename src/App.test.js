import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders taxi controls, transfer fields and pdf actions", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /turnos laborales con calculo automatico de horas y taxi/i,
    })
  ).toBeInTheDocument();

  const beforeInput = screen.getByLabelText(/minutos antes de entrada/i);
  const afterInput = screen.getByLabelText(/minutos despues de salida/i);

  fireEvent.change(beforeInput, { target: { value: "30" } });
  fireEvent.change(afterInput, { target: { value: "20" } });

  expect(beforeInput).toHaveValue(30);
  expect(afterInput).toHaveValue(20);

  expect(
    screen.getAllByDisplayValue("Av. Apoquindo 4001").length
  ).toBeGreaterThan(0);
  expect(screen.getAllByText(/\$\s*6\.800/).length).toBeGreaterThan(0);
  expect(
    screen.getByText(/total mensual 4 turnos/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/dotacion turno administrativo/i)
  ).toBeInTheDocument();
  expect(screen.getByText("Camila Soto")).toBeInTheDocument();
  expect(
    screen.getAllByText(/personas en este trayecto/i).length
  ).toBeGreaterThan(0);
  expect(
    screen.getByRole("button", { name: /trabajadores/i })
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /descargar pdf del turno/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /descargar pdf de todos los turnos/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /exportar planificacion/i })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/importar planificacion/i)
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /trabajadores/i }));
  expect(screen.getByText(/padron general/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue("Camila Soto")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/nueva area/i)).toBeInTheDocument();
  expect(screen.getAllByText("rrhh").length).toBeGreaterThan(0);
  expect(screen.getByText(/resumen de trabajadores/i)).toBeInTheDocument();
  expect(
    screen.getAllByRole("button", { name: /agregar trabajador/i }).length
  ).toBeGreaterThan(0);
});

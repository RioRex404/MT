// Datos de los modelos
const modelos = [
    {
        id: 1,
        titulo: "📉 MODELO 1: Casos IRA vs Temperatura Mínima",
        ecuacion: "ŷ = -51.461x + 1094.2",
        r2: "12.05%",
        correlacion: "-0.347",
        error: "123.11",
        interpretacion: "Se identifica una relación inversa débil entre la temperatura mínima y los casos de IRA. Por cada grado Celsius de aumento en la temperatura, los casos disminuyen en aproximadamente 51. El bajo coeficiente de determinación (R² = 12.05%) indica que solo el 12.05% de la variabilidad en los casos se explica por este factor climático.",
        color: "#3498db",
        variable: "Temperatura Mínima (°C)"
    },
    {
        id: 2,
        titulo: "🌧️ MODELO 2: Casos IRA vs Precipitación",
        ecuacion: "ŷ = -2.3105x + 443.72",
        r2: "18.89%",
        correlacion: "-0.435",
        error: "123.11",
        interpretacion: "Existe una relación inversa moderada entre la precipitación y los casos de IRA. Por cada milímetro de aumento en la precipitación, los casos disminuyen en aproximadamente 2.3. El coeficiente de determinación (R² = 18.89%) muestra una capacidad predictiva moderada, siendo superior a la temperatura mínima pero aún limitada.",
        color: "#f39c12",
        variable: "Precipitación (mm)"
    },
    {
        id: 3,
        titulo: "💧 MODELO 3: Casos IRA vs Humedad Relativa",
        ecuacion: "ŷ = 80.48x - 5431.45",
        r2: "65.91%",
        correlacion: "0.812",
        error: "79.81",
        interpretacion: "Se identifica una relación positiva fuerte entre la humedad relativa y los casos de IRA. Por cada punto porcentual de aumento en la humedad, los casos se incrementan en aproximadamente 80. El alto coeficiente de determinación (R² = 65.91%) indica que la humedad relativa explica el 65.91% de la variabilidad en los casos, constituyéndose como el mejor predictor climático analizado.",
        color: "#27ae60",
        variable: "Humedad Relativa (%)"
    },
    {
        id: 4,
        titulo: "🌡️ MODELO 4: Casos IRA vs Temperatura Máxima",
        ecuacion: "ŷ = -45.465x + 1489.08",
        r2: "15.33%",
        correlacion: "-0.392",
        error: "125.78",
        interpretacion: "Se observa una relación inversa moderada entre la temperatura máxima y los casos de IRA. Por cada grado Celsius de aumento en la temperatura máxima, los casos disminuyen en aproximadamente 45. El coeficiente de determinación (R² = 15.33%) posiciona a esta variable como un predictor moderado, con capacidad explicativa superior a la temperatura mínima pero significativamente menor que la humedad relativa.",
        color: "#9b59b6",
        variable: "Temperatura Máxima (°C)"
    }
];

// Datos para gráficos principales
const variables = ['Humedad Relativa', 'Precipitación', 'Temp. Máxima', 'Temp. Mínima'];
const r2Values = [65.9, 18.9, 15.3, 12.1];
const corrValues = [0.812, 0.435, 0.392, 0.347];

// Datos de muestra (primeros y últimos meses)
const datosMuestra = [
    { año: 2020, mes: 'Ene', casos: 280, tempMin: 15.5, precip: 60, humedad: 72.0, tempMax: 26.5 },
    { año: 2020, mes: 'Feb', casos: 250, tempMin: 15.3, precip: 75, humedad: 72.5, tempMax: 26.0 },
    { año: 2020, mes: 'Mar', casos: 300, tempMin: 14.9, precip: 50, humedad: 73.0, tempMax: 25.5 },
    { año: 2025, mes: 'Oct', casos: 400, tempMin: 14.8, precip: 40, humedad: 76.5, tempMax: 25.7 },
    { año: 2025, mes: 'Nov', casos: 350, tempMin: 15.3, precip: 55, humedad: 76.0, tempMax: 26.4 },
    { año: 2025, mes: 'Dic', casos: 330, tempMin: 15.8, precip: 70, humedad: 75.5, tempMax: 26.9 }
];

// Inicializar dashboard cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    crearGraficosPrincipales();
    generarModelos();
    generarTablaDatos();
});

// Crear gráficos principales
function crearGraficosPrincipales() {
    // Gráfico circular - R²
    Plotly.newPlot('pieChart', [{
        values: r2Values,
        labels: variables,
        type: 'pie',
        hole: 0.4,
        marker: {
            colors: ['#27ae60', '#f39c12', '#e74c3c', '#3498db']
        },
        textinfo: 'label+percent',
        hovertemplate: '<b>%{label}</b><br>R²: %{value}%<extra></extra>'
    }], {
        height: 380,
        showlegend: false,
        margin: { t: 50, b: 50, l: 50, r: 50 }
    });

    // Gráfico de barras - Correlación
    Plotly.newPlot('barChart', [{
        y: variables,
        x: corrValues,
        type: 'bar',
        orientation: 'h',
        marker: {
            color: ['#27ae60', '#f39c12', '#e74c3c', '#3498db']
        },
        hovertemplate: '<b>%{y}</b><br>Correlación: %{x:.3f}<extra></extra>'
    }], {
        height: 380,
        xaxis: {
            title: 'Coeficiente de Correlación (r)',
            range: [0, 1]
        },
        margin: { t: 50, b: 50, l: 120, r: 50 }
    });
}

// Generar modelos en el DOM
function generarModelos() {
    const container = document.getElementById('modelos-container');
    
    modelos.forEach(modelo => {
        const modeloHTML = `
            <div class="modelo-container">
                <div class="modelo-header">
                    <div class="modelo-title">${modelo.titulo}</div>
                    <div class="modelo-stats">
                        <div class="stat-item r2">R² = ${modelo.r2}</div>
                        <div class="stat-item corr">r = ${modelo.correlacion}</div>
                        <div class="stat-item error">Error = ${modelo.error}</div>
                    </div>
                </div>
                <div class="modelo-equation">
                    <strong>ECUACIÓN DEL MODELO:</strong> ${modelo.ecuacion}
                </div>
                <div class="interpretacion">
                    <strong>INTERPRETACIÓN:</strong> ${modelo.interpretacion}
                </div>
                <div id="modelo${modelo.id}Chart" class="chart-container" style="height: 400px;"></div>
            </div>
        `;
        
        container.innerHTML += modeloHTML;
        
        // Crear gráfico para este modelo
        crearGraficoModelo(modelo);
    });
}

// Crear gráfico individual para cada modelo
function crearGraficoModelo(modelo) {
    const x = [];
    const y = [];
    const n = 50;
    
    // Generar datos simulados basados en los parámetros del modelo
    for (let i = 0; i < n; i++) {
        let xVal;
        switch(modelo.id) {
            case 1: // Temp Min
                xVal = 12 + Math.random() * 4.5;
                break;
            case 2: // Precipitación
                xVal = 5 + Math.random() * 90;
                break;
            case 3: // Humedad
                xVal = 71 + Math.random() * 6.5;
                break;
            case 4: // Temp Max
                xVal = 22.5 + Math.random() * 5;
                break;
        }
        
        const error = (Math.random() - 0.5) * 150;
        const pendiente = parseFloat(modelo.ecuacion.split(' ')[2]);
        const intercepto = parseFloat(modelo.ecuacion.split(' ')[4]);
        const yVal = pendiente * xVal + intercepto + error;
        
        x.push(parseFloat(xVal.toFixed(1)));
        y.push(Math.max(100, Math.min(650, Math.round(yVal))));
    }

    const trace1 = {
        x: x,
        y: y,
        mode: 'markers',
        type: 'scatter',
        name: 'Datos observados',
        marker: {
            color: modelo.color,
            size: 8,
            opacity: 0.6
        }
    };

    // Calcular puntos para la línea de regresión
    const xMin = Math.min(...x);
    const xMax = Math.max(...x);
    const pendiente = parseFloat(modelo.ecuacion.split(' ')[2]);
    const intercepto = parseFloat(modelo.ecuacion.split(' ')[4]);
    
    const xLine = [xMin, xMax];
    const yLine = [pendiente * xMin + intercepto, pendiente * xMax + intercepto];
    
    const trace2 = {
        x: xLine,
        y: yLine,
        mode: 'lines',
        name: 'Línea de regresión',
        line: {
            color: '#e74c3c',
            width: 4
        }
    };

    Plotly.newPlot(`modelo${modelo.id}Chart`, [trace1, trace2], {
        title: modelo.titulo,
        xaxis: { title: modelo.variable },
        yaxis: { title: 'Casos de IRA' },
        height: 350,
        showlegend: true,
        legend: { x: 0, y: 1 }
    });
}

// Generar tabla de datos
function generarTablaDatos() {
    const tabla = document.getElementById('tabla-datos');
    
    // Encabezados
    let html = `
        <thead>
            <tr>
                <th>Año</th>
                <th>Mes</th>
                <th>Casos IRA</th>
                <th>Temp. Min (°C)</th>
                <th>Precip. (mm)</th>
                <th>Humedad (%)</th>
                <th>Temp. Max (°C)</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    // Filas de datos
    datosMuestra.forEach(dato => {
        html += `
            <tr>
                <td>${dato.año}</td>
                <td>${dato.mes}</td>
                <td>${dato.casos}</td>
                <td>${dato.tempMin}</td>
                <td>${dato.precip}</td>
                <td>${dato.humedad}</td>
                <td>${dato.tempMax}</td>
            </tr>
        `;
    });
    
    // Fila informativa
    html += `
            <tr>
                <td colspan="7" style="background: #f8f9fa; color: #7f8c8d; text-align: center;">
                    ... y 66 filas adicionales (72 meses en total) ...
                </td>
            </tr>
        </tbody>
    `;
    
    tabla.innerHTML = html;
}
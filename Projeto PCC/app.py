from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

# Configurações do banco de dados
db_config = {
    "host": "Projeto TCC",  # Substitua pelo endereço do servidor
    "user": "seu_usuario",  # Substitua pelo nome do usuário
    "password": "sua_senha",  # Substitua pela senha
    "database": "nome_do_banco"  # Substitua pelo nome do banco de dados
}

@app.route('/clientes')
def exibir_clientes():
    try:
        # Conexão com o banco de dados
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor(dictionary=True)

        # Consulta para buscar os dados da tabela Clientes
        query = "SELECT id, nome, cpf, numero FROM Clientes"
        cursor.execute(query)
        clientes = cursor.fetchall()

        # Renderiza a página HTML com os dados dos clientes
        return render_template('clientes.html', clientes=clientes)

    except mysql.connector.Error as e:
        return f"Erro ao conectar ao banco de dados: {e}"

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

if __name__ == '__main__':
    app.run(debug=True)
from flask import Flask, jsonify, render_template
import pandas as pd 


df = pd.read_csv("netflix_data.csv")
df['release_year'] = df['release_year'].sort_values()


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-piechart')
def get_piechart():
    classes = df["rating"].value_counts().index
    values = df["rating"].value_counts().values

    data = []

    for i in range(len(classes)):
        data.append({"class":classes[i], "value":int(values[i])})
    
    return jsonify(data)

@app.route('/get-barchart')
def get_barchart():
    classes = df["type"].value_counts().index
    values = df["type"].value_counts().values

    apidata = []

    for i in range(len(classes)):
        apidata.append({"class":classes[i], "value":int(values[i])})
    
    return jsonify(apidata)


@app.route('/get-sbarchart')
def get_sbarchart():
    classes = df["listed_in"].value_counts().index
    values = df["listed_in"].value_counts().values

    datadf= []

    for i in range(len(classes)):
        datadf.append({"class":classes[i], "value":int(values[i])})
    
    return jsonify(datadf)

@app.route('/get-donutchart')
def get_donutchart():
    classes = df["duration"].value_counts().index
    values = df["duration"].value_counts().values

    dataset = []

    for i in range(len(classes)):
        dataset.append({"class":classes[i], "value":int(values[i])})
    
    return jsonify(dataset)




if __name__ == '__main__':
    app.run(debug=True)
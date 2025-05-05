using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using System.IO;

public class SceneController : MonoBehaviour
{
    [System.Serializable]
    public class ParametricObject
    {
        public Vector3 position;
        public Vector3 scale;
        public Color color;
        public string type; // "Cube", "Sphere", "Cylinder"
    }

    public List<ParametricObject> sceneObjects = new List<ParametricObject>();
    public Transform container;

    public Button btnRegenerar;
    public Button btnExportar;
    public Button btnRandomizar;

    private void Start()
    {
        btnRegenerar.onClick.AddListener(RegenerarEscena);
        btnExportar.onClick.AddListener(ExportarEscena);
        btnRandomizar.onClick.AddListener(RandomizarEscena);

        RegenerarEscena(); // Cargar la escena inicial
    }

    public void RegenerarEscena()
    {
        // Borrar objetos anteriores
        foreach (Transform child in container)
        {
            Destroy(child.gameObject);
        }

        // Crear nuevos objetos
        foreach (var obj in sceneObjects)
        {
            GameObject go = null;


        // Opciones de figuras:
            switch (obj.type)
            {
                case "Cube":
                    go = GameObject.CreatePrimitive(PrimitiveType.Cube);
                    break;
                case "Sphere":
                    go = GameObject.CreatePrimitive(PrimitiveType.Sphere);
                    break;
                case "Cylinder":
                    go = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
                    break;
                default:
                    continue;
            }

            go.transform.parent = container;
            go.transform.position = obj.position;
            go.transform.localScale = obj.scale;

            var renderer = go.GetComponent<Renderer>();
            renderer.material = new Material(Shader.Find("Standard")); // Asegurar material visible
            renderer.material.color = obj.color;
        }
    }

    //Exportar json para el bonus.
    public void ExportarEscena()
    {
        string path = Application.dataPath + "/parametric_scene.json";
        string json = JsonUtility.ToJson(new Wrapper { objects = sceneObjects }, true);
        File.WriteAllText(path, json);
        Debug.Log("Escena exportada a: " + path);
    }

    public void RandomizarEscena()
    {
        sceneObjects.Clear();

        for (int i = 0; i < 10; i++)
        {
            ParametricObject obj = new ParametricObject
            {
                position = new Vector3(Random.Range(-5, 5), Random.Range(0, 3), Random.Range(-5, 5)),
                scale = Vector3.one * Random.Range(0.5f, 2f),
                color = new Color(Random.value, Random.value, Random.value),
                type = Random.Range(0, 3) switch
                {
                    0 => "Cube",
                    1 => "Sphere",
                    2 => "Cylinder",
                    _ => "Cube"
                }
            };
            sceneObjects.Add(obj);
        }

        RegenerarEscena();
    }

    // Envolver para serializar listas
    [System.Serializable]
    public class Wrapper
    {
        public List<ParametricObject> objects;
    }
}

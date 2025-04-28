using System.Collections;
using System.Collections.Generic;
using UnityEngine;




[RequireComponent(typeof(MeshFilter))]
public class MeshInfoDisplay : MonoBehaviour
{
    private Mesh mesh; // Var para almacenar el mesh del objeto.

    void Start()
    {
        //Obtiene el mesh desde el MeshFilter del objeto.
        mesh = GetComponent<MeshFilter>().mesh;

        // Imprime en CONSOLA el número de vértices, triángulos y submeshes.
        Debug.Log($"Vertices: {mesh.vertexCount}");
        Debug.Log($"Triangles: {mesh.triangles.Length / 3}");
        Debug.Log($"Submeshes: {mesh.subMeshCount}");
    }

    void OnDrawGizmos()

    // Se usa Gizmos para dibujar un wireframe (permite dibujar cosas en el editor)
    {

        // Si aún no se ha asigna el mesh, se pone del MeshFilter.
        if (mesh == null)
            mesh = GetComponent<MeshFilter>()?.sharedMesh;

        // Si encuentra un mesh, dibuja als aristas.
        if (mesh != null)
        {
            Gizmos.color = Color.green; // Color de las líneas.

            //Iterar todas las aristas y dibuja líneas entre los vértices.
            foreach (var edge in GetEdges(mesh))
            {
                // Transformamos las posiciones locales a posiciones globales. Porque gismo las pide globales.
                Gizmos.DrawLine(transform.TransformPoint(edge.Item1), transform.TransformPoint(edge.Item2));
            }
        }
    }

    //Obtener aristas del mesh como pares de vértices:
    private System.Collections.Generic.List<(Vector3, Vector3)> GetEdges(Mesh m)
    {
        var edges = new System.Collections.Generic.List<(Vector3, Vector3)>();
        var triangles = m.triangles; // Array --> define los triángulos mediante índices a vértices.
        var vertices = m.vertices;   // Array --> posiciones de los vértices.

      
        // Cada triángulo está compuesto por 3 índices consecutivos en el array de triángulos.
        for (int i = 0; i < triangles.Length; i += 3)
        {
            //Se agregan las 3 aristas de cada triángulo.
            edges.Add((vertices[triangles[i]], vertices[triangles[i + 1]]));
            edges.Add((vertices[triangles[i + 1]], vertices[triangles[i + 2]]));
            edges.Add((vertices[triangles[i + 2]], vertices[triangles[i]]));
        }
        return edges;
    }
}

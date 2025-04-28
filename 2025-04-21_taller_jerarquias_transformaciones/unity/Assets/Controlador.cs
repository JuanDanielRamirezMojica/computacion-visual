using UnityEngine;
using UnityEngine.UI;

public class Controlador : MonoBehaviour
{
    public Slider rotacionSlider;
    public Slider posicionSlider;
    public Slider escalaSlider;

    private bool animacionActiva = true;
    private float velocidadAnimacion = 30f; //Grados por segundo

    void Update()
    {
        if (animacionActiva)
        {
            // Control manual de los sliders
            transform.Rotate(rotacionSlider.value * velocidadAnimacion, 0, rotacionSlider.value * velocidadAnimacion);
            transform.position = new Vector3(posicionSlider.value, transform.position.y, transform.position.z);
            transform.localScale = Vector3.one * escalaSlider.value;
        }
 

        //Mostrar los valores en consola
        Debug.Log($"Posición: {transform.position}, Rotación: {transform.rotation.eulerAngles}, Escala: {transform.localScale}");
    }

}


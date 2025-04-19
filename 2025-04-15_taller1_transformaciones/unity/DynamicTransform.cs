using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class DynamicTransform : MonoBehaviour
{
    private float timeSinceLastMove = 0f;
    public float timeBetweenMoves = 2f;
    public float movementDistance = 3.5f;


    // Start is called before the first frame update
    void Start()
    {

    }

    void Update()
    {
        // 1. Rotación constante en todos los ejes
        transform.Rotate(new Vector3(30, 45, 60) * Time.deltaTime);

        // 2. Escala oscilante como un pulso
        float scale = 1 + 0.3f * Mathf.Sin(Time.time * 2f);
        transform.localScale = new Vector3(scale, scale, scale);


        // 3. Traslación aleatoria en X o Y cada ciertos segundos

        // Contador
        timeSinceLastMove += Time.deltaTime;

        
        if (timeSinceLastMove >= timeBetweenMoves)
        {
            timeSinceLastMove = 0f;

            // Elegimos aleatoriamente si nos movemos en el eje X (0) o en el eje Y (1)
            int axisToMove = Random.Range(0, 2);

            //Dirección aleatoria entre -1 y 1 
            float randomDirection = Random.Range(-1f, 1f);

           //Vector de movimiento.
            Vector3 movement;

            if (axisToMove == 0) // Mover en  X
            {
                movement = new Vector3(randomDirection * movementDistance, 0f, 0f);
            }
            else //Mover en Y
            {
                movement = new Vector3(0f, randomDirection * movementDistance, 0f);
            }

          
            transform.Translate(movement, Space.World);
        }


    }
}

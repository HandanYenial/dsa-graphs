class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  //This function accepts a Node instance and adds it to the node property on the graph
  /**This function should add a node to the graph.

let graph = new Graph()
let a = new Node("A")
let b = new Node("B")
let c = new Node("C")
graph.addVertices([a,b])
graph.addVertex(c)
graph.nodes.has(a) // true
graph.nodes.has(b) // true
graph.nodes.has(c) // true */

  addVertex(vertex) {
    this.node.add(vertex);
  }

  //This function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.addVertex(vertex)
    }
  }

  //This function accepts two vertices and updates their adjacent values to include the other vertex
  /**This function should add an edge between two nodes in the graph and place each value of the nodes in each array for the value of the node in the adjacency list.

let graph = new Graph()
let a = new Node("A")
let b = new Node("B")
let c = new Node("C")
let d = new Node("D")
graph.addVertices([a, b, c, d])
graph.addEdge(a, b)
graph.addEdge(a, c)
graph.addEdge(b, d)
graph.addEdge(c, d)

a.adjacent // contains b and c
b.adjacent // contains a and d
c.adjacent // contains a and d
d.adjacent // contains b and c */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  //This function accepts two vertices and updates their adjacent values to remove the other vertex
  /**This function should accept two nodes and remove the edge between them. 
   * It should modify the adjacency list to ensure that both values are not in each array for the two nodes 
   * which no longer contains the edge.

let graph = new Graph()
let a = new Node("A")
let b = new Node("B")
let c = new Node("C")
let d = new Node("D")
graph.addVertices([a, b, c, d])
graph.addEdge(a, b)
graph.addEdge(a, c)
graph.addEdge(b, d)
graph.addEdge(c, d)

graph.removeEdge(b,a)
graph.removeEdge(c,d)


a.adjacent // does not contain b
b.adjacent // does not contain a

c.adjacent // does not contain d
d.adjacent // does not contain c
 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  //This function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists 
  //that include that vertex
  /**This function should remove the node in the array of nodes and also remove all edges that the removed node
   *previously contained.

let graph = new Graph()
let a = new Node("A")
let b = new Node("B")
let c = new Node("C")
let d = new Node("D")
graph.addVertices([a, b, c, d])
graph.addEdge(a, b)
graph.addEdge(a, c)
graph.addEdge(b, d)
graph.addEdge(c, d)

graph.removeVertex(c)
graph.removeVertex(d)

graph.nodes.has(a) // true
graph.nodes.has(b) // true
graph.nodes.has(c) // false
graph.nodes.has(d) // false
 */
  removeVertex(vertex) {
    for (let node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  //This function returns an array of Node values using DFS
  /**This function should return an array of nodes visited using DFS. You can do this iteratively (using a stack)
   * or recursively, but note the order of the results will be different. Try to solve this without consulting 
   * the lecture notes!

let graph = new Graph()
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph.addVertices([S,P,U,X,Q,Y,V,R,W,T])

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

// this is one option:
graph.depthFirstSearch(S) // ["S", "P", "U", "X", "Q", "V", "Y", "R", "W", "T"]
 */
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function traverse(vertex){
      //base case
      if(!vertex){
        return null;
      }
      //visit node
      visited.add(vertex);
      result.push(vertex.value);

      //visit neighbors
      vertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          return traverse(neighbor);
        }
      });
    }
    traverse(start);
    return result;
  }

  depthFirstSearchIterative(start){
    //create an empty stack
    const stack = [start];
    const result = [];
    const visited = new Set();
    let currentVertex;

    //visit node
    visited.add(start);

    //while there are still neigbors to visit
    while(stack.length){
      currentVertex = stack.pop();
      result.push(currentVertex.value);

      //visit neigbors and push onto stack
      currentVertex.adhacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          visited.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  //This function returns an array of Node values using BFS
  /**This function should return an array of vertices visited using BFS.

let graph = new Graph()
let S = new Node('S');
let P = new Node('P');
let U = new Node('U');
let X = new Node('X');
let Q = new Node('Q');
let Y = new Node('Y');
let V = new Node('V');
let R = new Node('R');
let W = new Node('W');
let T = new Node('T');

graph.addVertices([S,P,U,X,Q,Y,V,R,W,T])

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);

// this is one option:
graph.depthFirstSearch(S) // ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"] */
  breadthFirstSearch(start) {
    const queue = [start];
    const result =[];
    const visited = new Set();

    let currentVertex;

    //visit node
    visited.add(start);

    //while there are still neighbors to visit
    while(queue.length){
      currentVertex = queue.shift();
      result.push(currentVertex.value);

      //visit neighbors and push onto the stack
      currentVertex.adjacent.forEach(neighbor => {
        if(!visited.has(neighbor)){
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return result;
  }

  shortestPath(start,end){
    if(start === end){
      return[start.value];
    }

    var queue = [start];
    let visited = new Set();
    let previous = {};
    let path = [];
    let currentVertex;


    while(queue.length){
     let  currentVertex = queue.shift();

     if(currentVertex === end){
      let stop = previous[end.value];
      while(stop){
        path.push(stop);
        stop = previous[stop];
      }
      path.unshift(start.value);
      path.reverse();
      return path;
     }

     visited.add(currentVertex);
     for(let vertex of currentVertex.adjacent){
        if(!visited.has(vertex)){
          previous[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
     }
    }
  }
}

    

module.exports = {Graph, Node}

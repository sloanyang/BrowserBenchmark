
function pointPlaneDistance(pt, plPt, plN) {

    return V3.dot(plN, V3.sub(pt, plPt));
}

function computeAngularVelocity(sphere, n) {

    var v = V3.$(0, 0, 0);
    var d = V3.dot(sphere.velocity, n);
    V3.sub(sphere.velocity, V3.scale(n, d), v);
    if (V3.length(v) > 0.0001) {
        var t = V3.cross(v, n);
        var nt = V3.normalize(t);
        sphere.angVelocity[1] = nt[0];
        sphere.angVelocity[2] = nt[1];
        sphere.angVelocity[3] = nt[2];
        sphere.angVelocity[0] = -V3.length(t) / sphere.size;
    }
    else {
        sphere.angVelocity[0] = 0;
    }
}

function computeSphereCubeCollisions(spheres, cube) {

    var plN = V3.$(0, 0, 0);
    var plPt = V3.$(0, 0, 0);

    for (var i = 0; i < spheres.length; i++) {
        for (var p = 0; p < 6; p++) {
            var o = Math.floor(p/2)*4;
            plN[0] = cube.orientation[o    ];
            plN[1] = cube.orientation[o + 1];
            plN[2] = cube.orientation[o + 2];
            if (p % 2) V3.neg(plN, plN);
            
            V3.scale(plN, -cube.size, plPt);
            V3.add(plPt, cube.pos, plPt);
            if (pointPlaneDistance(spheres[i].pos, plPt, plN) < spheres[i].size) {
                // reflect velocity
                var d = V3.dot(spheres[i].velocity, plN);
                if (d < 0) {
                    // first remove peneterating component
                    V3.sub(spheres[i].velocity, V3.scale(plN, d), spheres[i].velocity);                    
                    // then do superball if penetrating component small
                    if (d > -1)
                        V3.sub(spheres[i].velocity, V3.scale(plN, -4), spheres[i].velocity);
                    else
                        V3.sub(spheres[i].velocity, V3.scale(plN, d), spheres[i].velocity);                    
                        
                    computeAngularVelocity(spheres[i], plN);
                    spheres[i].boing = 0.2;
                }
            }
        }
    }
}

function computeSphereSphereCollisions(spheres, cube) {

    var dv = V3.$(0, 0, 0);
    var n = V3.$(0, 0, 0);
    var p = V3.$(0, 0, 0);
    
    for (var i = 0; i < spheres.length; i++) {
        for (var j = i + 1; j < spheres.length; j++) {
            V3.sub(spheres[j].velocity, spheres[i].velocity, dv);
            V3.sub(spheres[j].pos, spheres[i].pos, p)
            V3.normalize(p, n);
            
            if (V3.length(p) < (spheres[i].size + spheres[j].size) && V3.dot(dv, n) < 0) {
                // reflect velocity
                var d = V3.dot(spheres[i].velocity, n);
                V3.sub(spheres[i].velocity, V3.scale(n, 2*d), spheres[i].velocity);
                
                d = V3.dot(spheres[j].velocity, n);
                V3.sub(spheres[j].velocity, V3.scale(n, 2*d), spheres[j].velocity);
                
                computeAngularVelocity(spheres[i], V3.neg(n));
                computeAngularVelocity(spheres[j], n);
                spheres[i].boing = 0.2;
                spheres[j].boing = 0.2;
            }
        }
    }
}

function computeSphereInnerSphereCollisions(spheres, cube) {

    var dv = V3.$(0, 0, 0);
    var n = V3.$(0, 0, 0);
    var p = V3.$(0, 0, 0);
    
    for (var i = 0; i < spheres.length; i++) {
        // V3.sub(spheres[j].velocity, spheres[i].velocity, dv);
        dv = spheres[i].velocity;
        V3.sub(cube.pos, spheres[i].pos, p)
        V3.normalize(p, n);
        
        if (V3.length(p) > (spheres[i].size + cube.size/1.35) && V3.dot(dv, n) < 0) {
            // reflect velocity
            var d = V3.dot(spheres[i].velocity, n);
            V3.sub(spheres[i].velocity, V3.scale(n, 2.0*d), spheres[i].velocity);
                        
            computeAngularVelocity(spheres[i], V3.neg(n));
            spheres[i].boing = 0.2;
        }
    }
}

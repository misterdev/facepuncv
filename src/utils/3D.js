// From d3-threeD.js
/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as THREE from 'three';

var DEGS_TO_RADS = Math.PI / 180;
var DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

const transformSVGPath = ( pathStr ) => {

    var path = new THREE.ShapePath();

    var idx = 1, len = pathStr.length, activeCmd,
        x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
        x1 = 0, x2 = 0, y1 = 0, y2 = 0,
        rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

    function eatNum() {

        var sidx, c, isFloat = false, s;

        // eat delims

        while ( idx < len ) {

            c = pathStr.charCodeAt( idx );

            if ( c !== COMMA && c !== SPACE ) break;

            idx ++;

        }

        if ( c === MINUS ) {

            sidx = idx ++;

        } else {

            sidx = idx;

        }

        // eat number

        while ( idx < len ) {

            c = pathStr.charCodeAt( idx );

            if ( DIGIT_0 <= c && c <= DIGIT_9 ) {

                idx ++;
                continue;

            } else if ( c === PERIOD ) {

                idx ++;
                isFloat = true;
                continue;

            }

            s = pathStr.substring( sidx, idx );
            return isFloat ? parseFloat( s ) : parseInt( s );

        }

        s = pathStr.substring( sidx );
        return isFloat ? parseFloat( s ) : parseInt( s );

    }

    function nextIsNum() {

        var c;

        // do permanently eat any delims...

        while ( idx < len ) {

            c = pathStr.charCodeAt( idx );

            if ( c !== COMMA && c !== SPACE ) break;

            idx ++;

        }

        c = pathStr.charCodeAt( idx );
        return ( c === MINUS || ( DIGIT_0 <= c && c <= DIGIT_9 ) );

    }

    var canRepeat;
    activeCmd = pathStr[ 0 ];

    while ( idx <= len ) {

        canRepeat = true;

        switch ( activeCmd ) {

            // moveto commands, become lineto's if repeated
            case 'M':
                x = eatNum();
                y = eatNum();
                path.moveTo( x, y );
                activeCmd = 'L';
                firstX = x;
                firstY = y;
                break;

            case 'm':
                x += eatNum();
                y += eatNum();
                path.moveTo( x, y );
                activeCmd = 'l';
                firstX = x;
                firstY = y;
                break;

            case 'Z':
            case 'z':
                canRepeat = false;
                if ( x !== firstX || y !== firstY ) path.lineTo( firstX, firstY );
                break;

            // - lines!
            case 'L':
            case 'H':
            case 'V':
                nx = ( activeCmd === 'V' ) ? x : eatNum();
                ny = ( activeCmd === 'H' ) ? y : eatNum();
                path.lineTo( nx, ny );
                x = nx;
                y = ny;
                break;

            case 'l':
            case 'h':
            case 'v':
                nx = ( activeCmd === 'v' ) ? x : ( x + eatNum() );
                ny = ( activeCmd === 'h' ) ? y : ( y + eatNum() );
                path.lineTo( nx, ny );
                x = nx;
                y = ny;
                break;

            // - cubic bezier
            case 'C':
                x1 = eatNum(); y1 = eatNum();

            case 'S':
                if ( activeCmd === 'S' ) {

                    x1 = 2 * x - x2;
                    y1 = 2 * y - y2;

                }

                x2 = eatNum();
                y2 = eatNum();
                nx = eatNum();
                ny = eatNum();
                path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
                x = nx; y = ny;
                break;

            case 'c':
                x1 = x + eatNum();
                y1 = y + eatNum();

            case 's':
                if ( activeCmd === 's' ) {

                    x1 = 2 * x - x2;
                    y1 = 2 * y - y2;

                }

                x2 = x + eatNum();
                y2 = y + eatNum();
                nx = x + eatNum();
                ny = y + eatNum();
                path.bezierCurveTo( x1, y1, x2, y2, nx, ny );
                x = nx; y = ny;
                break;

            // - quadratic bezier
            case 'Q':
                x1 = eatNum(); y1 = eatNum();

            case 'T':
                if ( activeCmd === 'T' ) {

                    x1 = 2 * x - x1;
                    y1 = 2 * y - y1;

                }
                nx = eatNum();
                ny = eatNum();
                path.quadraticCurveTo( x1, y1, nx, ny );
                x = nx;
                y = ny;
                break;

            case 'q':
                x1 = x + eatNum();
                y1 = y + eatNum();

            case 't':
                if ( activeCmd === 't' ) {

                    x1 = 2 * x - x1;
                    y1 = 2 * y - y1;

                }

                nx = x + eatNum();
                ny = y + eatNum();
                path.quadraticCurveTo( x1, y1, nx, ny );
                x = nx; y = ny;
                break;

            // - elliptical arc
            case 'A':
                rx = eatNum();
                ry = eatNum();
                xar = eatNum() * DEGS_TO_RADS;
                laf = eatNum();
                sf = eatNum();
                nx = eatNum();
                ny = eatNum();
                if ( rx !== ry ) console.warn( 'Forcing elliptical arc to be a circular one:', rx, ry );

                // SVG implementation notes does all the math for us! woo!
                // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes

                // step1, using x1 as x1'

                x1 = Math.cos( xar ) * ( x - nx ) / 2 + Math.sin( xar ) * ( y - ny ) / 2;
                y1 = - Math.sin( xar ) * ( x - nx ) / 2 + Math.cos( xar ) * ( y - ny ) / 2;

                // step 2, using x2 as cx'

                var norm = Math.sqrt( ( rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1 ) /
                        ( rx * rx * y1 * y1 + ry * ry * x1 * x1 ) );

                if ( laf === sf ) norm = - norm;

                x2 = norm * rx * y1 / ry;
                y2 = norm * - ry * x1 / rx;

                // step 3

                cx = Math.cos( xar ) * x2 - Math.sin( xar ) * y2 + ( x + nx ) / 2;
                cy = Math.sin( xar ) * x2 + Math.cos( xar ) * y2 + ( y + ny ) / 2;

                var u = new THREE.Vector2( 1, 0 );
                var v = new THREE.Vector2( ( x1 - x2 ) / rx, ( y1 - y2 ) / ry );

                var startAng = Math.acos( u.dot( v ) / u.length() / v.length() );

                if ( ( ( u.x * v.y ) - ( u.y * v.x ) ) < 0 ) startAng = - startAng;

                // we can reuse 'v' from start angle as our 'u' for delta angle
                u.x = ( - x1 - x2 ) / rx;
                u.y = ( - y1 - y2 ) / ry;

                var deltaAng = Math.acos( v.dot( u ) / v.length() / u.length() );

                // This normalization ends up making our curves fail to triangulate...

                if ( ( ( v.x * u.y ) - ( v.y * u.x ) ) < 0 ) deltaAng = - deltaAng;
                if ( ! sf && deltaAng > 0 ) deltaAng -= Math.PI * 2;
                if ( sf && deltaAng < 0 ) deltaAng += Math.PI * 2;

                path.absarc( cx, cy, rx, startAng, startAng + deltaAng, sf );
                x = nx;
                y = ny;
                break;

            default:
                throw new Error( 'Wrong path command: ' + activeCmd );

        }

        // just reissue the command

        if ( canRepeat && nextIsNum() ) continue;

        activeCmd = pathStr[ idx ++ ];

    }
    return path;
};

const loadCardboard = ( svgObject, depth=12, color=0x462004 ) => {
    var path = transformSVGPath( svgObject.path )
    var threeColor = new THREE.Color( color )
    var material = new THREE.MeshLambertMaterial({
        color: threeColor,
        emissive: threeColor
    })
    var simpleShapes = path.toShapes( true )
    for ( var j = 0; j < simpleShapes.length; j ++ ) {
        var simpleShape = simpleShapes[ j ]
        var shape3d = new THREE.ExtrudeBufferGeometry(simpleShape, {
            depth,
            bevelEnabled: false
        })
        var mesh = new THREE.Mesh( shape3d, material )
        mesh.rotation.x = Math.PI
    }
    mesh.scale.set(0.5,0.5,0.5)

    var texture, material, plane
    const width = 259, height = 761

    texture = new THREE.TextureLoader().load( "textures/avatar.png" )
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    material = new THREE.MeshLambertMaterial({
        map : texture,
        alphaTest: 0.5
    })

    plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material)
    plane.material.side = THREE.DoubleSide
    plane.rotation.z = Math.PI
    plane.translateX( - width / 2 )
    plane.translateY( - height / 2 )
    plane.translateZ( -1 )
    
    plane.scale.set(-1, 1, 1)
    mesh.add(plane)

    return mesh
}

const avatar = {
    path: "M33.00,435.00 " +
        "C35.90,428.73 35.26,423.39 28.00,421.00 " +
        "31.90,418.14 31.63,417.45 30.00,413.00 " +
        "21.02,412.73 21.80,404.50 24.00,398.00 " +
        "26.29,406.05 22.81,407.44 30.00,412.00 " +
        "37.49,399.52 34.13,395.90 34.76,383.00 " +
        "34.76,383.00 35.94,377.00 35.94,377.00 " +
        "35.94,377.00 35.94,363.00 35.94,363.00 " +
        "36.18,347.14 37.45,354.90 40.29,345.00 " +
        "40.29,345.00 41.96,338.00 41.96,338.00 " +
        "41.96,338.00 45.99,329.00 45.99,329.00 " +
        "49.51,320.54 56.84,299.62 58.00,291.00 " +
        "60.18,304.03 54.96,316.26 53.28,329.00 " +
        "53.28,329.00 51.03,347.00 51.03,347.00 " +
        "51.03,347.00 51.03,356.00 51.03,356.00 " +
        "51.03,356.00 43.46,387.00 43.46,387.00 " +
        "41.17,399.63 41.15,412.23 41.00,425.00 " +
        "41.00,425.00 40.27,435.00 40.27,435.00 " +
        "40.45,438.57 41.84,440.04 41.99,446.00 " +
        "41.99,446.00 41.04,458.00 41.04,458.00 " +
        "41.04,458.00 41.04,474.00 41.04,474.00 " +
        "41.04,474.00 43.00,501.00 43.00,501.00 " +
        "43.00,501.00 41.54,528.00 41.54,528.00 " +
        "39.72,538.35 37.02,544.94 36.96,556.00 " +
        "36.96,556.00 36.96,566.00 36.96,566.00 " +
        "36.96,566.00 36.18,573.00 36.18,573.00 " +
        "36.18,573.00 37.00,583.00 37.00,583.00 " +
        "37.00,583.00 38.17,605.00 38.17,605.00 " +
        "38.17,605.00 40.06,615.00 40.06,615.00 " +
        "40.06,615.00 40.06,625.00 40.06,625.00 " +
        "41.48,634.08 44.16,634.75 44.00,649.00 " +
        "44.00,649.00 42.00,665.00 42.00,665.00 " +
        "41.89,674.36 42.14,682.72 43.59,692.00 " +
        "43.94,694.25 44.57,699.63 45.95,701.28 " +
        "47.19,702.74 51.96,704.13 54.00,705.00 " +
        "46.60,707.96 39.97,711.30 33.00,715.10 " +
        "29.79,716.85 27.29,717.34 24.78,720.22 " +
        "21.16,724.39 15.38,737.51 19.60,742.44 " +
        "23.15,746.61 32.87,746.99 38.00,747.00 " +
        "38.00,747.00 67.00,747.00 67.00,747.00 " +
        "78.50,746.84 78.67,741.41 85.00,739.43 " +
        "87.43,738.68 93.66,739.96 97.00,740.00 " +
        "100.36,740.04 107.86,740.35 110.40,738.07 " +
        "112.48,736.20 112.07,731.55 111.83,729.00 " +
        "111.83,729.00 110.00,706.00 110.00,706.00 " +
        "110.00,706.00 117.00,706.00 117.00,706.00 " +
        "117.00,706.00 117.00,694.00 117.00,694.00 " +
        "117.00,694.00 115.49,675.00 115.49,675.00 " +
        "115.49,675.00 116.09,664.00 116.09,664.00 " +
        "116.09,664.00 121.00,617.00 121.00,617.00 " +
        "121.00,617.00 119.13,596.00 119.13,596.00 " +
        "119.13,596.00 119.13,585.00 119.13,585.00 " +
        "119.13,585.00 119.66,573.00 119.66,573.00 " +
        "119.66,573.00 118.83,559.00 118.83,559.00 " +
        "118.83,559.00 116.79,548.00 116.79,548.00 " +
        "116.79,548.00 115.34,519.00 115.34,519.00 " +
        "115.34,519.00 116.08,507.83 116.08,507.83 " +
        "116.08,507.83 117.82,500.00 117.82,500.00 " +
        "117.82,500.00 120.73,476.00 120.73,476.00 " +
        "120.73,476.00 128.00,441.00 128.00,441.00 " +
        "130.45,446.79 136.30,461.36 137.49,467.00 " +
        "137.49,467.00 139.30,488.00 139.30,488.00 " +
        "139.30,488.00 141.79,499.00 141.79,499.00 " +
        "142.69,503.26 143.95,514.68 144.00,519.00 " +
        "144.00,519.00 145.29,539.00 145.29,539.00 " +
        "145.29,539.00 147.14,551.00 147.14,551.00 " +
        "147.14,551.00 147.14,580.00 147.14,580.00 " +
        "147.14,580.00 149.00,604.00 149.00,604.00 " +
        "149.00,604.00 151.72,627.00 151.72,627.00 " +
        "151.72,627.00 153.08,641.00 153.08,641.00 " +
        "153.08,641.00 153.08,652.00 153.08,652.00 " +
        "153.08,652.00 154.44,664.00 154.44,664.00 " +
        "154.44,664.00 156.17,675.00 156.17,675.00 " +
        "156.44,681.17 153.47,682.34 153.57,686.00 " +
        "153.64,688.71 155.69,690.67 156.58,694.00 " +
        "156.58,694.00 159.55,714.00 159.55,714.00 " +
        "160.83,718.19 162.97,719.49 164.07,723.00 " +
        "166.86,731.87 161.48,742.32 163.31,748.89 " +
        "164.92,754.66 172.41,752.93 174.89,753.75 " +
        "178.36,754.89 178.34,758.08 181.27,759.40 " +
        "183.42,760.37 193.04,759.97 196.00,760.21 " +
        "196.00,760.21 205.00,760.21 205.00,760.21 " +
        "205.00,760.21 233.00,758.00 233.00,758.00 " +
        "231.63,741.04 223.95,735.54 217.00,721.00 " +
        "217.00,721.00 225.00,719.00 225.00,719.00 " +
        "225.00,719.00 224.09,700.00 224.09,700.00 " +
        "224.51,693.23 227.79,688.18 227.79,684.00 " +
        "227.80,680.33 226.10,679.10 226.00,672.00 " +
        "226.00,672.00 227.17,645.00 227.17,645.00 " +
        "228.05,636.25 229.14,638.86 228.74,628.00 " +
        "228.74,628.00 230.91,593.09 230.91,593.09 " +
        "230.91,593.09 230.91,567.00 230.91,567.00 " +
        "230.98,552.91 228.14,550.75 225.81,539.00 " +
        "225.81,539.00 224.68,530.00 224.68,530.00 " +
        "224.68,530.00 222.62,521.00 222.62,521.00 " +
        "222.62,521.00 219.04,491.00 219.04,491.00 " +
        "219.04,491.00 219.91,480.00 219.91,480.00 " +
        "219.91,480.00 218.00,462.00 218.00,462.00 " +
        "218.00,462.00 218.00,453.00 218.00,453.00 " +
        "218.00,453.00 215.02,430.28 215.02,430.28 " +
        "215.02,430.28 213.25,423.00 213.25,423.00 " +
        "213.25,423.00 211.70,408.00 211.70,408.00 " +
        "211.70,408.00 209.36,399.00 209.36,399.00 " +
        "209.36,399.00 207.54,387.00 207.54,387.00 " +
        "206.08,379.18 203.84,369.87 204.01,362.00 " +
        "204.01,362.00 206.99,325.00 206.99,325.00 " +
        "206.99,325.00 205.83,306.58 205.83,306.58 " +
        "205.96,299.11 207.14,298.58 207.29,295.42 " +
        "207.29,295.42 207.29,287.00 207.29,287.00 " +
        "207.29,287.00 208.00,276.00 208.00,276.00 " +
        "213.47,284.29 211.82,292.74 213.71,300.00 " +
        "214.78,304.11 216.41,305.62 217.78,309.00 " +
        "217.78,309.00 221.59,321.00 221.59,321.00 " +
        "221.59,321.00 223.97,340.00 223.97,340.00 " +
        "225.37,346.02 227.65,346.44 227.96,354.00 " +
        "228.37,364.03 224.16,374.05 220.13,383.00 " +
        "220.13,383.00 217.72,388.00 217.72,388.00 " +
        "217.72,388.00 216.45,394.00 216.45,394.00 " +
        "215.06,399.06 211.38,401.95 212.91,405.87 " +
        "214.09,408.92 217.88,409.71 220.16,407.40 " +
        "221.23,406.31 225.80,392.50 229.89,400.16 " +
        "231.08,402.40 229.90,406.66 229.26,409.00 " +
        "224.90,424.81 221.67,420.38 217.00,432.00 " +
        "224.76,437.07 222.81,433.05 233.00,430.22 " +
        "236.42,429.28 239.86,428.27 242.82,426.23 " +
        "251.81,420.02 256.97,407.70 256.97,397.00 " +
        "256.97,397.00 256.04,388.00 256.04,388.00 " +
        "256.04,388.00 256.64,382.00 256.64,382.00 " +
        "256.64,382.00 256.00,366.00 256.00,366.00 " +
        "256.00,366.00 258.00,338.00 258.00,338.00 " +
        "258.00,338.00 258.00,304.00 258.00,304.00 " +
        "258.00,304.00 256.92,289.00 256.92,289.00 " +
        "256.92,289.00 256.92,276.00 256.92,276.00 " +
        "256.92,276.00 255.00,257.00 255.00,257.00 " +
        "254.97,253.78 255.19,250.12 254.47,247.00 " +
        "253.35,242.09 250.26,237.62 248.35,233.00 " +
        "246.31,228.09 243.15,214.16 243.34,209.00 " +
        "243.48,205.02 243.02,205.24 242.79,202.00 " +
        "242.79,202.00 243.68,176.00 243.68,176.00 " +
        "244.82,160.78 232.02,147.16 220.00,139.71 " +
        "220.00,139.71 212.00,135.73 212.00,135.73 " +
        "212.00,135.73 204.00,130.22 204.00,130.22 " +
        "204.00,130.22 195.01,126.01 195.01,126.01 " +
        "187.73,121.35 183.55,110.06 178.82,106.85 " +
        "176.08,105.00 168.58,104.47 165.00,104.00 " +
        "165.00,104.00 167.58,83.00 167.58,83.00 " +
        "167.58,83.00 171.52,75.00 171.52,75.00 " +
        "172.71,71.57 172.76,65.44 174.60,63.60 " +
        "176.33,61.87 179.68,62.00 182.00,61.48 " +
        "190.04,59.69 189.67,56.74 199.00,59.00 " +
        "206.84,40.29 182.90,51.96 173.89,37.98 " +
        "168.90,30.24 164.33,14.02 158.53,8.39 " +
        "149.73,-0.16 139.26,-0.24 128.00,0.83 " +
        "128.00,0.83 120.00,1.41 120.00,1.41 " +
        "115.43,2.52 104.65,8.65 101.48,12.18 " +
        "96.42,17.83 91.66,36.85 87.24,41.68 " +
        "83.75,45.49 68.56,43.30 64.01,49.39 " +
        "60.43,54.18 65.75,60.22 70.17,61.99 " +
        "75.02,63.94 80.63,61.74 84.98,64.60 " +
        "89.35,67.46 91.35,72.48 93.42,77.00 " +
        "98.68,88.55 98.77,84.78 98.18,98.00 " +
        "98.17,101.04 99.37,103.53 98.18,105.70 " +
        "98.18,105.70 84.13,115.30 84.13,115.30 " +
        "78.83,120.42 79.81,125.84 73.95,130.37 " +
        "67.36,135.45 59.57,134.94 50.00,141.13 " +
        "39.39,147.98 36.49,156.70 32.98,168.00 " +
        "32.01,171.10 29.70,177.11 29.49,180.00 " +
        "29.49,180.00 30.00,189.00 30.00,189.00 " +
        "30.11,199.13 29.07,218.42 26.83,228.00 " +
        "26.83,228.00 19.74,252.00 19.74,252.00 " +
        "19.74,252.00 17.38,263.00 17.38,263.00 " +
        "17.38,263.00 14.62,270.00 14.62,270.00 " +
        "14.62,270.00 12.51,279.00 12.51,279.00 " +
        "12.51,279.00 10.50,298.00 10.50,298.00 " +
        "10.50,298.00 8.89,305.00 8.89,305.00 " +
        "8.89,305.00 8.89,314.00 8.89,314.00 " +
        "8.89,314.00 4.04,336.00 4.04,336.00 " +
        "4.04,336.00 6.99,360.00 6.99,360.00 " +
        "6.99,360.00 6.06,375.00 6.06,375.00 " +
        "6.32,379.77 7.98,380.93 7.94,386.00 " +
        "7.89,393.26 5.12,400.72 6.14,408.00 " +
        "6.63,411.46 8.03,412.98 9.49,416.00 " +
        "10.79,418.69 11.84,422.30 13.70,424.53 " +
        "16.94,428.44 28.01,433.58 33.00,435.00 Z"
}

function setWeight( action, weight ) {
    action.enabled = true;
    action.setEffectiveTimeScale( 1 );
    action.setEffectiveWeight( weight );
}
function executeCrossFade( startAction, endAction, duration ) {
    // Not only the start action, but also the end action must get a weight of 1 before fading
    // (concerning the start action this is already guaranteed in this place)
    setWeight( endAction, 1);
    endAction.time = 0;
    // Crossfade with warping - you can also try without warping by setting the third parameter to false
    startAction.crossFadeTo( endAction, duration, true );
}    

export { 
    avatar,
    loadCardboard,
    setWeight,
    executeCrossFade
}
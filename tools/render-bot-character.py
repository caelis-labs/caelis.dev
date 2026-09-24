"""Render the released Caelis GLB into a transparent animation for the web film.
Run with Blender in background; --model and --out are explicit local inputs.
This renders the owner's asset, it does not modify its mesh or appearance.
"""
import argparse, json, math, sys
from pathlib import Path
import bpy
from mathutils import Vector

p=argparse.ArgumentParser()
p.add_argument('--model', required=True)
p.add_argument('--out', required=True)
p.add_argument('--fps', type=int, default=12)
p.add_argument('--clips', nargs='+', default=['idle','working','attention','nod','celebrate'])
a=p.parse_args(sys.argv[sys.argv.index('--')+1:])
out=Path(a.out).resolve(); out.mkdir(parents=True,exist_ok=True)
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(Path(a.model).resolve()))
scene=bpy.context.scene
scene.render.engine='CYCLES'
scene.cycles.samples=16
scene.cycles.use_denoising=True
scene.render.resolution_x=520;scene.render.resolution_y=720;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.render.image_settings.color_mode='RGBA';scene.render.film_transparent=True
scene.view_settings.view_transform='Standard'
scene.world=bpy.data.worlds.new('Studio');scene.world.use_nodes=True
scene.world.node_tree.nodes['Background'].inputs[0].default_value=(1,1,1,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value=.3
# glTF Y-up is converted to Blender Z-up; keep the source's front face.
bpy.ops.object.camera_add(location=(.08,-5,1.0))
camera=bpy.context.object;camera.rotation_euler=(Vector((0,0,1.05))-camera.location).to_track_quat('-Z','Y').to_euler()
camera.data.type='ORTHO';camera.data.ortho_scale=2.6;scene.camera=camera
for name,pos,power,size in [('Key',(-3,-4,5),200,4),('Fill',(3,-2,3),100,4),('Rim',(0,3,4),150,3)]:
 bpy.ops.object.light_add(type='AREA',location=pos);o=bpy.context.object;o.name=name;o.data.energy=power;o.data.shape='DISK';o.data.size=size
 o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
# Activate the source clips, including their authored rig/morph tracks.
tracks=[]
for obj in bpy.data.objects:
 targets=[obj]
 if obj.type=='MESH' and obj.data.shape_keys: targets.append(obj.data.shape_keys)
 for target in targets:
  ad=target.animation_data
  if not ad: continue
  ad.action=None
  tracks.extend(ad.nla_tracks)
durations={'idle':4,'working':4,'attention':1.5,'nod':.9,'celebrate':1.6}
metadata={'fps':a.fps,'clips':{}}
for clip in a.clips:
 if clip not in durations: raise ValueError(f'Unsupported source clip: {clip}')
 enabled=[track for track in tracks if track.name==clip]
 if not enabled: raise ValueError(f'Missing source animation: {clip}')
 for track in tracks: track.mute=track not in enabled
 folder=out/clip;folder.mkdir(exist_ok=True)
 count=math.ceil(durations[clip]*a.fps)
 metadata['clips'][clip]={'duration':durations[clip],'frames':count}
 for i in range(count):
  position=i/a.fps*scene.render.fps
  scene.frame_set(math.floor(position),subframe=position%1)
  scene.render.filepath=str(folder/f'{i:03}.png')
  bpy.ops.render.render(write_still=True)
 print(f'Rendered {clip}: {count} frames',flush=True)
(out/'clips.json').write_text(json.dumps(metadata,indent=2))
